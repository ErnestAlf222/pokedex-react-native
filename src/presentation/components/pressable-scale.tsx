import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PRESS_ANIMATION_MS, effects } from '../../core';

interface PressableScaleProps
  extends Omit<PressableProps, 'style' | 'children'> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
}

// Contenedor pulsable que se encoge ligeramente mientras se presiona.
export const PressableScale = ({
  children,
  style,
  scaleTo = effects.pressedScale,
  ...pressableProps
}: PressableScaleProps) => {
  const scale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Devuelve un manejador que anima la escala al valor indicado.
  const animateTo = (value: number) => () => {
    scale.value = withTiming(value, { duration: PRESS_ANIMATION_MS });
  };

  return (
    <Pressable
      {...pressableProps}
      onPressIn={animateTo(scaleTo)}
      onPressOut={animateTo(1)}>
      <Animated.View style={[style, pressStyle]}>{children}</Animated.View>
    </Pressable>
  );
};
