import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { SPRING_CONFIG } from '../../core';

interface SpringEntranceOptions {
  delayMs: number;
  distance: number;
  scaleFrom?: number;
}

// Estilo de entrada con resorte: sube desde abajo, crece desde scaleFrom y aparece, tras el retraso indicado.
export const useSpringEntrance = ({
  delayMs,
  distance,
  scaleFrom = 1,
}: SpringEntranceOptions) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delayMs, withSpring(1, SPRING_CONFIG));
  }, [delayMs, progress]);

  return useAnimatedStyle(() => ({
    opacity: Math.min(progress.value, 1),
    transform: [
      { translateY: (1 - progress.value) * distance },
      { scale: scaleFrom + (1 - scaleFrom) * progress.value },
    ],
  }));
};
