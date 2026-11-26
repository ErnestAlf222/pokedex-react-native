import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PERCENT,
  STAT_BAR_DURATION_MS,
  colors,
  fontSize,
  fontWeight,
  getStatRatio,
  radius,
  sizes,
  spacing,
} from '../../core';

interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

// Fila de stat con etiqueta, valor y una barra que se llena al aparecer.
export const StatBar = ({ label, value, color }: StatBarProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(getStatRatio(value), {
      duration: STAT_BAR_DURATION_MS,
    });
  }, [progress, value]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * PERCENT}%`,
  }));

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, { backgroundColor: color }, fillStyle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    width: sizes.statLabelWidth,
    fontSize: fontSize.caption,
    color: colors.textSecondary,
  },
  value: {
    width: sizes.statValueWidth,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  track: {
    flex: 1,
    height: sizes.statBarHeight,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.full },
});
