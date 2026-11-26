import { StyleSheet, Text, View } from 'react-native';
import {
  INFO_COLUMNS,
  PERCENT,
  UI_MESSAGES,
  UNIT_LABELS,
  colors,
  decimetersToMeters,
  fontSize,
  fontWeight,
  formatSlug,
  hectogramsToKilograms,
  spacing,
} from '../../core';
import { PokemonDetail } from '../../domain';
import { DetailSection } from './detail-section';
import { EffectivenessSection } from './effectiveness-section';
import { FlagBadges } from './flag-badges';
import { GenderBar } from './gender-bar';
import { InfoItem } from './info-item';
import { LabelChipList } from './label-chip';

interface AboutTabProps {
  pokemon: PokemonDetail;
  color: string;
  effectivenessEnabled: boolean;
}

// Pestaña "Acerca de": descripción, medidas, habilidades, datos de la especie, género, grupos huevo, banderas y debilidades.
export const AboutTab = ({
  pokemon,
  color,
  effectivenessEnabled,
}: AboutTabProps) => {
  const facts = [
    { label: UI_MESSAGES.captureRate, value: String(pokemon.captureRate) },
    {
      label: UI_MESSAGES.baseExperience,
      value: String(pokemon.baseExperience),
    },
    { label: UI_MESSAGES.baseHappiness, value: String(pokemon.baseHappiness) },
    { label: UI_MESSAGES.growthRate, value: formatSlug(pokemon.growthRate) },
    ...(pokemon.habitat === null
      ? []
      : [{ label: UI_MESSAGES.habitat, value: formatSlug(pokemon.habitat) }]),
  ];

  return (
    <View>
      {pokemon.category !== '' && (
        <Text style={styles.category}>{pokemon.category}</Text>
      )}
      {pokemon.description !== '' && (
        <Text style={styles.description}>{pokemon.description}</Text>
      )}
      <View style={styles.cards}>
        <InfoItem
          label={UI_MESSAGES.height}
          value={`${decimetersToMeters(pokemon.height)} ${UNIT_LABELS.meter}`}
          tint={color}
        />
        <InfoItem
          label={UI_MESSAGES.weight}
          value={`${hectogramsToKilograms(pokemon.weight)} ${
            UNIT_LABELS.kilogram
          }`}
          tint={color}
        />
      </View>
      <DetailSection title={UI_MESSAGES.abilities}>
        <LabelChipList
          labels={pokemon.abilities.map(formatSlug)}
          color={color}
        />
      </DetailSection>
      <View style={styles.facts}>
        {facts.map(({ label, value }) => (
          <View key={label} style={styles.fact}>
            <InfoItem label={label} value={value} />
          </View>
        ))}
      </View>
      <DetailSection title={UI_MESSAGES.gender}>
        <GenderBar gender={pokemon.gender} />
      </DetailSection>
      <DetailSection title={UI_MESSAGES.eggGroups}>
        <LabelChipList
          labels={pokemon.eggGroups.map(formatSlug)}
          color={color}
        />
      </DetailSection>
      <FlagBadges
        isLegendary={pokemon.isLegendary}
        isMythical={pokemon.isMythical}
        isBaby={pokemon.isBaby}
      />
      <EffectivenessSection
        typeNames={pokemon.types}
        enabled={effectivenessEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  cards: { flexDirection: 'row', gap: spacing.md },
  facts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.lg,
  },
  fact: { width: `${PERCENT / INFO_COLUMNS}%` },
});
