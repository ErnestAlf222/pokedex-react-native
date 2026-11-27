import { StyleSheet, View } from 'react-native';
import { EFFECTIVENESS_COLUMNS, PERCENT, spacing } from '../../core';
import { TypeMultiplier } from '../../domain';
import { EffectivenessCell } from './effectiveness-cell';

interface EffectivenessMatrixProps {
  multipliers: TypeMultiplier[];
}

// Cuadrícula con un multiplicador por tipo, repartida en columnas iguales.
export const EffectivenessMatrix = ({
  multipliers,
}: EffectivenessMatrixProps) => (
  <View style={styles.grid}>
    {multipliers.map(({ type, multiplier }) => (
      <View key={type} style={styles.item}>
        <EffectivenessCell type={type} multiplier={multiplier} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.md },
  item: { width: `${PERCENT / EFFECTIVENESS_COLUMNS}%` },
});
