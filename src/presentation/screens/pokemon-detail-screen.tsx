import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  LIST_SEPARATOR,
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
  InfoItem,
  PokeballLoader,
  PokemonHero,
  TypeBadge,
} from '../components';
import { usePokemonDetail } from '../hooks';
import { PokemonDetailScreenProps } from '../navigation';

// Pantalla de detalle: encabezado con gradiente, identidad y datos básicos.
export const PokemonDetailScreen = ({
  route,
  navigation,
}: PokemonDetailScreenProps) => {
  const { data, error, isPending, refetch } = usePokemonDetail(
    route.params.id,
  );

  // Vuelve a la pantalla anterior sin pasar argumentos del evento.
  const goBack = () => navigation.goBack();

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

  return (
    <ScrollView style={styles.screen}>
      <PokemonHero
        imageUrl={data.imageUrl}
        gradientColors={getGradientColors(data.types)}
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
});
