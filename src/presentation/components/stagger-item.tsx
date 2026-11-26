import { ReactNode } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  MAX_STAGGERED_ITEMS,
  SECTION_ENTER_DELAY_MS,
  SECTION_ENTER_DURATION_MS,
} from '../../core';

interface StaggerItemProps {
  index: number;
  children: ReactNode;
}

// Envuelve un bloque para que entre con fade y desplazamiento, con retraso según su posición (limitado).
export const StaggerItem = ({ index, children }: StaggerItemProps) => (
  <Animated.View
    entering={FadeInDown.delay(
      Math.min(index, MAX_STAGGERED_ITEMS) * SECTION_ENTER_DELAY_MS,
    ).duration(SECTION_ENTER_DURATION_MS)}>
    {children}
  </Animated.View>
);
