import { StyleSheet, Text, View } from 'react-native';
import {
  MOVE_SEPARATOR,
  UI_MESSAGES,
  colors,
  fontSize,
  fontWeight,
  formatSlug,
  spacing,
} from '../../core';
import { PokemonMove } from '../../domain';

interface MovesTabProps {
  moves: PokemonMove[];
}

// Pestaña "Movimientos": filas compactas con nivel y nombre, o un aviso si no hay movimientos.
export const MovesTab = ({ moves }: MovesTabProps) =>
  moves.length === 0 ? (
    <Text style={styles.empty}>{UI_MESSAGES.noMoves}</Text>
  ) : (
    <View>
      {moves.map(({ name, level }) => (
        <View key={`${name}-${level}`} style={styles.row}>
          <Text style={styles.level}>{`${UI_MESSAGES.level} ${level}`}</Text>
          <Text style={styles.name}>
            {`${MOVE_SEPARATOR}${formatSlug(name)}`}
          </Text>
        </View>
      ))}
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
  empty: { fontSize: fontSize.body, color: colors.textSecondary },
});
