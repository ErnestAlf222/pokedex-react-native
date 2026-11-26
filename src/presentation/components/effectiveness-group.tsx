import { StyleSheet, Text, View } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  formatMultiplier,
  spacing,
} from '../../core';
import { TypeMultiplier } from '../../domain';
import { TypeBadge } from './type-badge';

interface EffectivenessGroupProps {
  title: string;
  items: TypeMultiplier[];
  showMultiplier?: boolean;
}

// Grupo de tipos atacantes con su color y, opcionalmente, el multiplicador; no se muestra si está vacío.
export const EffectivenessGroup = ({
  title,
  items,
  showMultiplier = true,
}: EffectivenessGroupProps) =>
  items.length === 0 ? null : (
    <View style={styles.group}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>
        {items.map(({ type, multiplier }) => (
          <View key={type} style={styles.item}>
            <TypeBadge type={type} />
            {showMultiplier && (
              <Text style={styles.multiplier}>
                {formatMultiplier(multiplier)}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );

const styles = StyleSheet.create({
  group: { marginBottom: spacing.md },
  title: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  items: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  item: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  multiplier: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
