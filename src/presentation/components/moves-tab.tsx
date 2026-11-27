import { StyleSheet, Text, View } from 'react-native';
import {
  MOVE_SEPARATOR,
  UI_MESSAGES,
  colors,
  fontSize,
  fontWeight,
  formatMoveLevel,
  formatSlug,
  spacing,
} from '../../core';
import { PokemonMove } from '../../domain';
import { StaggerItem } from './stagger-item';

interface MovesTabProps {
  moves: PokemonMove[];
}

// Pestaña "Movimientos": filas compactas con nivel y nombre que entran escalonadas, o un aviso si no hay movimientos.
export const MovesTab = ({ moves }: MovesTabProps) =>
  moves.length === 0 ? (
    <Text style={styles.empty}>{UI_MESSAGES.noMoves}</Text>
  ) : (
    <View>
      {moves.map(({ name, level }, index) => (
        <StaggerItem key={`${name}-${level}`} index={index}>
          <View style={styles.row}>
            <Text style={styles.level}>{formatMoveLevel(level)}</Text>
            <Text style={styles.name}>
              {`${MOVE_SEPARATOR}${formatSlug(name)}`}
            </Text>
          </View>
        </StaggerItem>
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
