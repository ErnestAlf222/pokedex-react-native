import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PLACEHOLDER_FADE_DURATION_MS,
  SCROLL_EVENT_THROTTLE,
  colors,
  effects,
  formatPokemonNumber,
  formatSlug,
  getGradientColors,
  getQueryViewState,
} from '../../core';
import {
  BackButton,
  CompactBar,
  PokemonDetailSheet,
  PokemonHero,
  QueryFallbackView,
} from '../components';
import { usePokemonDetail } from '../hooks';
import { PokemonDetailScreenProps } from '../navigation';

// Pantalla de detalle: héroe con parallax y hoja de pestañas; se reutiliza al elegir una etapa.
export const PokemonDetailScreen = ({
  route,
  navigation,
}: PokemonDetailScreenProps) => {
  const { id } = route.params;
  const query = usePokemonDetail(id);
  const { data, error, isPlaceholderData, refetch } = query;
  const viewState = getQueryViewState(query);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Guarda el desplazamiento vertical para el parallax del héroe.
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  // Vuelve al inicio del scroll cada vez que se elige otro Pokémon.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [id, scrollRef]);

  // Atenúa el contenido anterior mientras carga el nuevo y lo restaura al llegar.
  useEffect(() => {
    opacity.value = withTiming(
      isPlaceholderData ? effects.placeholderOpacity : 1,
      { duration: PLACEHOLDER_FADE_DURATION_MS },
    );
  }, [isPlaceholderData, opacity]);

  const fadeStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  // Vuelve a la pantalla anterior sin pasar argumentos del evento.
  const goBack = () => navigation.goBack();

  // Cambia el detalle a otra etapa en esta misma pantalla, sin apilar otra.
  const openStage = (stageId: number) => navigation.setParams({ id: stageId });

  if (viewState !== 'content' || !data) {
    return (
      <View style={styles.screen}>
        <QueryFallbackView
          state={viewState}
          error={error}
          onRetry={() => refetch()}
        />
        <BackButton onPress={goBack} />
      </View>
    );
  }

  const gradientColors = getGradientColors(data.types);

  return (
    <Animated.View style={[styles.screen, fadeStyle]}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        contentContainerStyle={styles.content}>
        <PokemonHero
          number={formatPokemonNumber(data.id)}
          name={formatSlug(data.name)}
          types={data.types}
          imageUrl={data.imageUrl}
          shinyImageUrl={data.shinyImageUrl}
          gradientColors={gradientColors}
          scrollY={scrollY}
        />
        <PokemonDetailSheet
          pokemon={data}
          currentId={id}
          color={gradientColors[0]}
          effectivenessEnabled={!isPlaceholderData}
          onSelectStage={openStage}
        />
      </Animated.ScrollView>
      <CompactBar
        name={formatSlug(data.name)}
        number={formatPokemonNumber(data.id)}
        gradientColors={gradientColors}
        scrollY={scrollY}
        onBack={goBack}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  content: { flexGrow: 1 },
});
