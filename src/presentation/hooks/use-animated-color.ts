import { useEffect } from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { GRADIENT_TRANSITION_MS } from '../../core';

type AnimatedColorProperty = 'backgroundColor' | 'borderColor';

// Estilo de color (fondo por defecto, o borde) que transiciona con interpolateColor desde el color anterior hasta el nuevo.
export const useAnimatedColor = (
  color: string,
  property: AnimatedColorProperty = 'backgroundColor',
) => {
  const from = useSharedValue(color);
  const to = useSharedValue(color);
  const progress = useSharedValue(1);

  // Al cambiar el color parte del anterior y avanza hasta el nuevo.
  useEffect(() => {
    from.value = to.value;
    to.value = color;
    progress.value = 0;
    progress.value = withTiming(1, { duration: GRADIENT_TRANSITION_MS });
  }, [color, from, to, progress]);

  return useAnimatedStyle(() => {
    const value = interpolateColor(
      progress.value,
      [0, 1],
      [from.value, to.value],
    );
    return property === 'borderColor'
      ? { borderColor: value }
      : { backgroundColor: value };
  });
};
