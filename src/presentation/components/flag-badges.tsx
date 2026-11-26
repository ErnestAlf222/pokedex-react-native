import { StyleSheet, View } from 'react-native';
import { UI_MESSAGES, flagColors, spacing } from '../../core';
import { LabelChip } from './label-chip';

interface FlagBadgesProps {
  isLegendary: boolean;
  isMythical: boolean;
  isBaby: boolean;
}

// Badges de Legendario, Mítico y Bebé; solo se muestran los que aplican.
export const FlagBadges = ({
  isLegendary,
  isMythical,
  isBaby,
}: FlagBadgesProps) => {
  const flags = [
    {
      active: isLegendary,
      label: UI_MESSAGES.legendary,
      color: flagColors.legendary,
    },
    {
      active: isMythical,
      label: UI_MESSAGES.mythical,
      color: flagColors.mythical,
    },
    { active: isBaby, label: UI_MESSAGES.baby, color: flagColors.baby },
  ].filter(({ active }) => active);

  if (flags.length === 0) {
    return null;
  }

  return (
    <View style={styles.row}>
      {flags.map(({ label, color }) => (
        <LabelChip key={label} label={label} color={color} filled />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});
