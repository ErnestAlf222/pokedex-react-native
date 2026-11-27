import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  MOVES_INITIAL_COUNT,
  UI_MESSAGES,
  colors,
  fontSize,
  fontWeight,
  radius,
  spacing,
} from '../../core';
import { PokemonMove } from '../../domain';
import { MoveRow } from './move-row';
import { PressableScale } from './pressable-scale';
import { StaggerItem } from './stagger-item';

interface MovesTabProps {
  moves: PokemonMove[];
}

// Pestaña "Movimientos": muestra los primeros movimientos como tarjetas y un botón "Ver más" para el resto, o un aviso si no hay.
export const MovesTab = ({ moves }: MovesTabProps) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? moves : moves.slice(0, MOVES_INITIAL_COUNT);

  // Muestra todos los movimientos restantes.
  const revealAll = () => setShowAll(true);

  return moves.length === 0 ? (
    <Text style={styles.empty}>{UI_MESSAGES.noMoves}</Text>
  ) : (
    <View>
      {visible.map(({ name, level }, index) => (
        <StaggerItem key={`${name}-${level}`} index={index}>
          <MoveRow name={name} level={level} />
        </StaggerItem>
      ))}
      {visible.length < moves.length && (
        <PressableScale onPress={revealAll} style={styles.more}>
          <Text style={styles.moreLabel}>{UI_MESSAGES.viewMore}</Text>
        </PressableScale>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: { fontSize: fontSize.body, color: colors.textSecondary },
  more: {
    alignSelf: 'center',
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  moreLabel: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
