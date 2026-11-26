import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  DEFAULT_DETAIL_TAB,
  DETAIL_TABS,
  DETAIL_TAB_LABELS,
  DetailTab,
  TAB_FADE_DURATION_MS,
  colors,
  radius,
  sizes,
  spacing,
} from '../../core';
import { PokemonDetail } from '../../domain';
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

// Hoja redondeada sobre el héroe con las pestañas del detalle; el contenido cambia con un fade corto.
export const PokemonDetailSheet = ({
  pokemon,
  currentId,
  color,
  effectivenessEnabled,
  onSelectStage,
}: PokemonDetailSheetProps) => {
  const [tab, setTab] = useState<DetailTab>(DEFAULT_DETAIL_TAB);
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
        onSelect={onSelectStage}
      />
    ),
    moves: <MovesTab moves={pokemon.moves} />,
  };

  return (
    <View style={styles.sheet}>
      <TabBar
        tabs={DETAIL_TABS}
        labels={DETAIL_TAB_LABELS}
        selected={tab}
        onSelect={setTab}
        color={color}
      />
      <Animated.View
        key={tab}
        entering={FadeIn.duration(TAB_FADE_DURATION_MS)}
        style={styles.content}>
        {content[tab]}
      </Animated.View>
    </View>
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
  content: { marginTop: spacing.lg },
});
