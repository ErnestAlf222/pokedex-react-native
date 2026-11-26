import { StyleSheet, Text, View } from 'react-native';
import {
  STAT_LABELS,
  UI_MESSAGES,
  colors,
  fontSize,
  fontWeight,
  formatSlug,
  getStatColor,
  sizes,
  spacing,
} from '../../core';
import { PokemonStat } from '../../domain';
import { StatBar } from './stat-bar';
import { StatsRadar } from './stats-radar';

interface StatsTabProps {
  stats: PokemonStat[];
  total: number;
  color: string;
}

// Pestaña "Estadísticas": barras con color por tramo, el total y el radar de los seis stats.
export const StatsTab = ({ stats, total, color }: StatsTabProps) => (
  <View>
    {stats.map(({ name, value }) => (
      <StatBar
        key={name}
        label={STAT_LABELS[name] ?? formatSlug(name)}
        value={value}
        color={getStatColor(value)}
      />
    ))}
    <View style={styles.total}>
      <Text style={styles.totalLabel}>{UI_MESSAGES.total}</Text>
      <Text style={styles.totalValue}>{total}</Text>
    </View>
    <StatsRadar stats={stats} color={color} />
  </View>
);

const styles = StyleSheet.create({
  total: { flexDirection: 'row', marginTop: spacing.xs },
  totalLabel: {
    width: sizes.statLabelWidth,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  totalValue: {
    width: sizes.statValueWidth,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'right',
    paddingRight: spacing.sm,
  },
});
