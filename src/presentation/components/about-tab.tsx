import { StyleSheet, Text, View } from 'react-native';
import {
  DETAIL_ICONS,
  EGG_GROUP_LABELS,
  GROWTH_RATE_LABELS,
  HABITAT_LABELS,
  INFO_COLUMNS,
  PERCENT,
  UI_MESSAGES,
  UNIT_LABELS,
  colors,
  decimetersToMeters,
  fontSize,
  fontWeight,
  formatSlug,
  getLabel,
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
import { StaggerItem } from './stagger-item';

interface AboutTabProps {
  pokemon: PokemonDetail;
  color: string;
  effectivenessEnabled: boolean;
}

// Pestaña "Acerca de": cada sección entra escalonada (descripción, medidas, habilidades, datos, género, grupos huevo, banderas y debilidades).
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
    {
      label: UI_MESSAGES.growthRate,
      value: getLabel(GROWTH_RATE_LABELS, pokemon.growthRate),
    },
    ...(pokemon.habitat === null
      ? []
      : [
          {
            label: UI_MESSAGES.habitat,
            value: getLabel(HABITAT_LABELS, pokemon.habitat),
          },
        ]),
  ];

  return (
    <View>
      <StaggerItem index={0}>
        {pokemon.category !== '' && (
          <Text style={styles.category}>{pokemon.category}</Text>
        )}
        {pokemon.description !== '' && (
          <Text style={styles.description}>{pokemon.description}</Text>
        )}
      </StaggerItem>
      <StaggerItem index={1}>
        <View style={styles.cards}>
          <InfoItem
            label={UI_MESSAGES.height}
            value={`${decimetersToMeters(pokemon.height)} ${UNIT_LABELS.meter}`}
            tint={color}
            icon={DETAIL_ICONS.height}
          />
          <InfoItem
            label={UI_MESSAGES.weight}
            value={`${hectogramsToKilograms(pokemon.weight)} ${
              UNIT_LABELS.kilogram
            }`}
            tint={color}
            icon={DETAIL_ICONS.weight}
          />
        </View>
      </StaggerItem>
      <StaggerItem index={2}>
        <DetailSection
          title={UI_MESSAGES.abilities}
          icon={DETAIL_ICONS.abilities}
          color={color}>
          <LabelChipList
            labels={pokemon.abilities.map(({ name }) => formatSlug(name))}
            color={color}
          />
        </DetailSection>
      </StaggerItem>
      <StaggerItem index={3}>
        <View style={styles.facts}>
          {facts.map(({ label, value }) => (
            <View key={label} style={styles.fact}>
              <InfoItem label={label} value={value} />
            </View>
          ))}
        </View>
      </StaggerItem>
      <StaggerItem index={4}>
        <DetailSection
          title={UI_MESSAGES.gender}
          icon={DETAIL_ICONS.gender}
          color={color}>
          <GenderBar gender={pokemon.gender} />
        </DetailSection>
      </StaggerItem>
      <StaggerItem index={5}>
        <DetailSection
          title={UI_MESSAGES.eggGroups}
          icon={DETAIL_ICONS.eggGroups}
          color={color}>
          <LabelChipList
            labels={pokemon.eggGroups.map(group =>
              getLabel(EGG_GROUP_LABELS, group),
            )}
            color={color}
          />
        </DetailSection>
      </StaggerItem>
      <StaggerItem index={6}>
        <FlagBadges
          isLegendary={pokemon.isLegendary}
          isMythical={pokemon.isMythical}
          isBaby={pokemon.isBaby}
        />
      </StaggerItem>
      <StaggerItem index={7}>
        <EffectivenessSection
          typeNames={pokemon.types}
          color={color}
          enabled={effectivenessEnabled}
        />
      </StaggerItem>
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
