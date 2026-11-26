import { useEffect, useRef, useState } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { GRADIENT_TRANSITION_MS } from '../../core';

type GradientColors = [string, string];

// Transición entre degradados: conserva el anterior encima y lo desvanece, lo que equivale a interpolar cada color en RGB.
export const useGradientCrossfade = (colors: GradientColors) => {
  const [top, bottom] = colors;
  const current = useRef<GradientColors>(colors);
  const [previous, setPrevious] = useState<GradientColors>(colors);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (current.current[0] === top && current.current[1] === bottom) {
      return;
    }
    setPrevious(current.current);
    current.current = [top, bottom];
    opacity.value = 1;
    opacity.value = withTiming(0, { duration: GRADIENT_TRANSITION_MS });
  }, [top, bottom, opacity]);

  const previousStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return { previous, previousStyle };
};
