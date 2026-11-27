import { StyleSheet, Text, View } from 'react-native';
import {
  UI_MESSAGES,
  colors,
  effects,
  fontSize,
  fontWeight,
  formatSlug,
  radius,
  spacing,
  withAlpha,
} from '../../core';
import { useAbilityDetail } from '../hooks';

interface AbilityCardProps {
  name: string;
  isHidden: boolean;
  color: string;
}

// Tarjeta de una habilidad con su nombre y descripción en español y la marca "Oculta"; sin datos muestra solo el nombre.
export const AbilityCard = ({ name, isHidden, color }: AbilityCardProps) => {
  const { data } = useAbilityDetail(name);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: withAlpha(color, effects.softTintOpacity) },
      ]}>
      <View style={styles.header}>
        <Text style={styles.name}>{data?.name ?? formatSlug(name)}</Text>
        {isHidden && (
          <View style={[styles.hidden, { backgroundColor: color }]}>
            <Text style={styles.hiddenLabel}>{UI_MESSAGES.hiddenAbility}</Text>
          </View>
        )}
      </View>
      {data !== undefined && data.description !== '' && (
        <Text style={styles.description}>{data.description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  name: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  hidden: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  hiddenLabel: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
  description: {
    marginTop: spacing.xs,
    fontSize: fontSize.caption,
    color: colors.textSecondary,
  },
});
