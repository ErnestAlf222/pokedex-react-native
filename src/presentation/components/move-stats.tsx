import { StyleSheet, Text, View } from 'react-native';
import {
  UI_MESSAGES,
  UNIT_LABELS,
  colors,
  fontSize,
  fontWeight,
  formatMoveStat,
  radius,
  spacing,
} from '../../core';
import { MoveDetail } from '../../domain';

interface StatChipProps {
  label: string;
  value: string;
}

// Chip con el nombre de la cifra y su valor.
const StatChip = ({ label, value }: StatChipProps) => (
  <View style={styles.chip}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

// Fila de chips con poder, precisión y PP del movimiento; "—" cuando la API no da la cifra.
export const MoveStats = ({
  power,
  accuracy,
  pp,
}: Pick<MoveDetail, 'power' | 'accuracy' | 'pp'>) => (
  <View style={styles.row}>
    <StatChip label={UI_MESSAGES.power} value={formatMoveStat(power)} />
    <StatChip
      label={UI_MESSAGES.accuracy}
      value={formatMoveStat(accuracy, UNIT_LABELS.percent)}
    />
    <StatChip label={UI_MESSAGES.pp} value={formatMoveStat(pp)} />
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surface,
  },
  label: { fontSize: fontSize.tiny, color: colors.textSecondary },
  value: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
