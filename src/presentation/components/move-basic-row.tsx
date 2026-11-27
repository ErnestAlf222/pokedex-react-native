import { StyleSheet, Text, View } from 'react-native';
import {
  MOVE_SEPARATOR,
  colors,
  fontSize,
  fontWeight,
  formatMoveLevel,
  formatSlug,
  spacing,
} from '../../core';

interface MoveBasicRowProps {
  name: string;
  level: number;
}

// Fila sencilla de un movimiento (nivel y nombre en texto); se usa mientras carga o si no hay datos del movimiento.
export const MoveBasicRow = ({ name, level }: MoveBasicRowProps) => (
  <View style={styles.row}>
    <Text style={styles.level}>{formatMoveLevel(level)}</Text>
    <Text style={styles.name}>{`${MOVE_SEPARATOR}${formatSlug(name)}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  level: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
  name: { fontSize: fontSize.body, color: colors.textPrimary },
});
