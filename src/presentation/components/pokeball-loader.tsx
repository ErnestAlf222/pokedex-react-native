import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  FULL_TURN_DEGREES,
  INFINITE_REPETITIONS,
  POKEBALL_ICON_NAME,
  POKEBALL_SPIN_DURATION_MS,
  colors,
  sizes,
} from '../../core';

interface PokeballLoaderProps {
  size?: number;
}

// Loader con el ícono de Pokébola girando de forma continua.
export const PokeballLoader = ({ size = sizes.loader }: PokeballLoaderProps) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(FULL_TURN_DEGREES, {
        duration: POKEBALL_SPIN_DURATION_MS,
        easing: Easing.linear,
      }),
      INFINITE_REPETITIONS,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <MaterialIcons name={POKEBALL_ICON_NAME} size={size} color={colors.primary} />
    </Animated.View>
  );
};
