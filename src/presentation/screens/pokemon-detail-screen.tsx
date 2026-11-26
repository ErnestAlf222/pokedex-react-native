import { useEffect, useRef } from 'react';
import {
  ScrollView,
  ScrollViewInstance,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  LIST_SEPARATOR,
  PLACEHOLDER_FADE_DURATION_MS,
  STAT_LABELS,
  UI_MESSAGES,
  UNIT_LABELS,
  colors,
  decimetersToMeters,
  effects,
  fontSize,
  fontWeight,
  formatPokemonNumber,
  formatSlug,
  getGradientColors,
  getQueryViewState,
  hectogramsToKilograms,
  spacing,
} from '../../core';
import {
  BackButton,
  EvolutionSection,
  InfoItem,
  PokemonHero,
  QueryFallbackView,
  StatBar,
  TypeBadge,
} from '../components';
import { usePokemonDetail } from '../hooks';
import { PokemonDetailScreenProps } from '../navigation';

// Pantalla de detalle: encabezado, datos básicos, stats y evoluciones; se reutiliza al elegir una etapa.
export const PokemonDetailScreen = ({
  route,
  navigation,
}: PokemonDetailScreenProps) => {
  const { id } = route.params;
  const query = usePokemonDetail(id);
  const { data, error, isPlaceholderData, refetch } = query;
  const viewState = getQueryViewState(query);
  const scrollRef = useRef<ScrollViewInstance>(null);
  const opacity = useSharedValue(1);

  // Vuelve al inicio del scroll cada vez que se elige otro Pokémon.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [id]);

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
      <ScrollView ref={scrollRef}>
        <PokemonHero
          imageUrl={data.imageUrl}
          shinyImageUrl={data.shinyImageUrl}
          gradientColors={gradientColors}
          onBack={goBack}
        />
        <View style={styles.body}>
          <Text style={styles.number}>{formatPokemonNumber(data.id)}</Text>
          <Text style={styles.name}>{formatSlug(data.name)}</Text>
          <View style={styles.badges}>
            {data.types.map(type => (
              <TypeBadge key={type} type={type} />
            ))}
          </View>
          <View style={styles.row}>
            <InfoItem
              label={UI_MESSAGES.height}
              value={`${decimetersToMeters(data.height)} ${UNIT_LABELS.meter}`}
            />
            <InfoItem
              label={UI_MESSAGES.weight}
              value={`${hectogramsToKilograms(data.weight)} ${UNIT_LABELS.kilogram}`}
            />
          </View>
          <InfoItem
            label={UI_MESSAGES.abilities}
            value={data.abilities.map(formatSlug).join(LIST_SEPARATOR)}
          />
          <Text style={styles.sectionTitle}>{UI_MESSAGES.stats}</Text>
          {data.stats.map(stat => (
            <StatBar
              key={stat.name}
              label={STAT_LABELS[stat.name] ?? formatSlug(stat.name)}
              value={stat.value}
              color={gradientColors[0]}
            />
          ))}
          <Text style={styles.sectionTitle}>{UI_MESSAGES.evolutions}</Text>
          <EvolutionSection
            stages={data.evolutions}
            currentId={id}
            onSelect={openStage}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg },
  number: { fontSize: fontSize.body, color: colors.textSecondary },
  name: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  row: { flexDirection: 'row', gap: spacing.xl },
  sectionTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});
