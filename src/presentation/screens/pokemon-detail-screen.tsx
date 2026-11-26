import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  LIST_SEPARATOR,
  ROUTES,
  STAT_LABELS,
  UI_MESSAGES,
  UNIT_LABELS,
  colors,
  decimetersToMeters,
  fontSize,
  fontWeight,
  formatPokemonNumber,
  formatSlug,
  getErrorMessage,
  getGradientColors,
  hectogramsToKilograms,
  layout,
  spacing,
} from '../../core';
import {
  BackButton,
  ErrorView,
  EvolutionSection,
  InfoItem,
  PokeballLoader,
  PokemonHero,
  StatBar,
  TypeBadge,
} from '../components';
import { usePokemonDetail } from '../hooks';
import { PokemonDetailScreenProps } from '../navigation';

// Pantalla de detalle: encabezado, datos básicos, stats y evoluciones.
export const PokemonDetailScreen = ({
  route,
  navigation,
}: PokemonDetailScreenProps) => {
  const { data, error, isPending, refetch } = usePokemonDetail(
    route.params.id,
  );

  // Vuelve a la pantalla anterior sin pasar argumentos del evento.
  const goBack = () => navigation.goBack();

  // Abre el detalle de otra etapa apilándolo, para poder volver al anterior.
  const openStage = (id: number) =>
    navigation.push(ROUTES.pokemonDetail, { id });

  if (isPending || !data) {
    return (
      <View style={styles.screen}>
        {isPending ? (
          <View style={layout.center}>
            <PokeballLoader />
          </View>
        ) : (
          <ErrorView
            message={getErrorMessage(error)}
            onRetry={() => refetch()}
          />
        )}
        <BackButton onPress={goBack} />
      </View>
    );
  }

  const gradientColors = getGradientColors(data.types);

  return (
    <ScrollView style={styles.screen}>
      <PokemonHero
        imageUrl={data.imageUrl}
        spriteBack={data.spriteBack}
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
          currentId={data.id}
          onSelect={openStage}
        />
      </View>
    </ScrollView>
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
