import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {
  DAMAGE_CLASS_LABELS,
  MOVE_EXPAND_DURATION_MS,
  colors,
  fontSize,
  fontWeight,
  formatLevelBadge,
  getDamageClassIcon,
  getLabel,
  getTypeColor,
  radius,
  sizes,
  spacing,
} from '../../core';
import { MoveDetail } from '../../domain';
import { MoveStats } from './move-stats';
import { TypeIcon } from './type-icon';

interface MoveCardProps {
  move: MoveDetail;
  level: number;
}

// Tarjeta de un movimiento: círculo de nivel, nombre, tipo, clase y cifras; al tocarla se expande con la descripción.
export const MoveCard = ({ move, level }: MoveCardProps) => {
  const [expanded, setExpanded] = useState(false);

  // Alterna la descripción visible.
  const toggle = () => setExpanded(isOpen => !isOpen);

  return (
    <Animated.View
      layout={LinearTransition.duration(MOVE_EXPAND_DURATION_MS)}
      style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={toggle}>
        <View style={styles.header}>
          <View
            style={[
              styles.level,
              { backgroundColor: getTypeColor(move.type) },
            ]}>
            <Text style={styles.levelText}>{formatLevelBadge(level)}</Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {move.name}
          </Text>
          <TypeIcon type={move.type} small />
          <MaterialIcons
            accessibilityLabel={getLabel(DAMAGE_CLASS_LABELS, move.damageClass)}
            name={getDamageClassIcon(move.damageClass)}
            size={sizes.classIcon}
            color={colors.textSecondary}
          />
        </View>
        <MoveStats
          power={move.power}
          accuracy={move.accuracy}
          pp={move.pp}
        />
      </Pressable>
      {expanded && move.description !== '' && (
        <Animated.Text
          entering={FadeInDown.duration(MOVE_EXPAND_DURATION_MS)}
          exiting={FadeOut.duration(MOVE_EXPAND_DURATION_MS)}
          style={styles.description}>
          {move.description}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  level: {
    width: sizes.levelBadge,
    height: sizes.levelBadge,
    borderRadius: sizes.levelBadge / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
  name: {
    flex: 1,
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.sm,
    fontSize: fontSize.caption,
    color: colors.textSecondary,
  },
});
