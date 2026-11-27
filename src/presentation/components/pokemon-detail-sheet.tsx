import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  DEFAULT_DETAIL_TAB,
  DETAIL_TABS,
  DETAIL_TAB_LABELS,
  DetailTab,
  SHEET_ENTRY_DELAY_MS,
  SPRING_CONFIG,
  TAB_FADE_DURATION_MS,
  TAB_SWIPE_ACTIVE_OFFSET_X,
  TAB_SWIPE_COMMIT_DISTANCE,
  TAB_SWIPE_COMMIT_VELOCITY,
  TAB_SWIPE_EDGE_RESISTANCE,
  TAB_SWIPE_FAIL_OFFSET_Y,
  colors,
  effects,
  radius,
  sizes,
  spacing,
  vibrate,
} from '../../core';
import { PokemonDetail } from '../../domain';
import { useSpringEntrance } from '../hooks';
import { AboutTab } from './about-tab';
import { EvolutionSection } from './evolution-section';
import { MovesTab } from './moves-tab';
import { StatsTab } from './stats-tab';
import { TabBar } from './tab-bar';

interface PokemonDetailSheetProps {
  pokemon: PokemonDetail;
  currentId: number;
  color: string;
  effectivenessEnabled: boolean;
  onSelectStage: (id: number) => void;
}

// Hoja redondeada sobre el héroe: sube con resorte y muestra las pestañas, que se cambian tocando o deslizando.
export const PokemonDetailSheet = ({
  pokemon,
  currentId,
  color,
  effectivenessEnabled,
  onSelectStage,
}: PokemonDetailSheetProps) => {
  const [tab, setTab] = useState<DetailTab>(DEFAULT_DETAIL_TAB);
  const tabIndex = DETAIL_TABS.indexOf(tab);
  const dragX = useSharedValue(0);
  const slideX = useSharedValue(0);
  const fade = useSharedValue(1);
  const entrance = useSpringEntrance({
    delayMs: SHEET_ENTRY_DELAY_MS,
    distance: sizes.sheetEntryDistance,
  });

  // Cambia de pestaña con vibración y hace entrar el contenido nuevo desde el lado del gesto.
  const changeTab = (next: DetailTab) => {
    if (next === tab) {
      return;
    }
    vibrate();
    slideX.value =
      Math.sign(DETAIL_TABS.indexOf(next) - tabIndex) * sizes.tabSlideDistance;
    fade.value = 0;
    slideX.value = withSpring(0, SPRING_CONFIG);
    fade.value = withTiming(1, { duration: TAB_FADE_DURATION_MS });
    setTab(next);
  };

  // Elige una etapa evolutiva con una vibración corta.
  const selectStage = (id: number) => {
    vibrate();
    onSelectStage(id);
  };

  // Deslizado horizontal: el contenido sigue al dedo y, al soltar, cambia a la pestaña vecina si el gesto fue suficiente.
  const swipe = usePanGesture({
    activeOffsetX: [-TAB_SWIPE_ACTIVE_OFFSET_X, TAB_SWIPE_ACTIVE_OFFSET_X],
    failOffsetY: [-TAB_SWIPE_FAIL_OFFSET_Y, TAB_SWIPE_FAIL_OFFSET_Y],
    onUpdate: event => {
      'worklet';
      const isOutOfRange =
        (event.translationX > 0 && tabIndex === 0) ||
        (event.translationX < 0 && tabIndex === DETAIL_TABS.length - 1);
      dragX.value = isOutOfRange
        ? event.translationX * TAB_SWIPE_EDGE_RESISTANCE
        : event.translationX;
    },
    onDeactivate: event => {
      'worklet';
      const goesNext =
        event.translationX < -TAB_SWIPE_COMMIT_DISTANCE ||
        event.velocityX < -TAB_SWIPE_COMMIT_VELOCITY;
      const goesPrevious =
        event.translationX > TAB_SWIPE_COMMIT_DISTANCE ||
        event.velocityX > TAB_SWIPE_COMMIT_VELOCITY;
      const target = tabIndex + (goesNext ? 1 : 0) - (goesPrevious ? 1 : 0);
      const nextTab = DETAIL_TABS[target];
      dragX.value = withSpring(0, SPRING_CONFIG);
      if (nextTab !== undefined && target !== tabIndex) {
        scheduleOnRN(changeTab, nextTab);
      }
    },
  });

  // El contenido se desplaza con el gesto y se atenúa conforme se aleja.
  const contentStyle = useAnimatedStyle(() => ({
    opacity:
      fade.value *
      (1 -
        (1 - effects.tabDragFadeMin) *
          Math.min(Math.abs(dragX.value) / sizes.tabDragRange, 1)),
    transform: [{ translateX: dragX.value + slideX.value }],
  }));

  const content: Record<DetailTab, ReactNode> = {
    about: (
      <AboutTab
        pokemon={pokemon}
        color={color}
        effectivenessEnabled={effectivenessEnabled}
      />
    ),
    stats: (
      <StatsTab
        stats={pokemon.stats}
        total={pokemon.statsTotal}
        color={color}
      />
    ),
    evolutions: (
      <EvolutionSection
        stages={pokemon.evolutions}
        currentId={currentId}
        color={color}
        onSelect={selectStage}
        blocksGesture={swipe}
      />
    ),
    moves: <MovesTab moves={pokemon.moves} />,
  };

  return (
    <Animated.View style={[styles.sheet, entrance]}>
      <GestureDetector gesture={swipe}>
        <View style={styles.area}>
          <TabBar
            tabs={DETAIL_TABS}
            labels={DETAIL_TAB_LABELS}
            selected={tab}
            onSelect={changeTab}
            color={color}
          />
          <Animated.View style={[styles.content, contentStyle]}>
            {content[tab]}
          </Animated.View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    marginTop: -sizes.sheetOverlap,
    padding: spacing.lg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: colors.surface,
  },
  area: { flex: 1 },
  content: { marginTop: spacing.lg },
});
