import { useEffect } from 'react';
import {
  Easing,
  SharedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  HERO_FLOAT_DURATION_MS,
  INFINITE_REPETITIONS,
  sizes,
} from '../../core';

// Valor compartido del flotado del héroe (0 abajo, negativo arriba); lo usan la imagen y su sombra para ir sincronizadas.
export const useHeroFloat = (): SharedValue<number> => {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-sizes.floatDistance, {
        duration: HERO_FLOAT_DURATION_MS,
        easing: Easing.inOut(Easing.ease),
      }),
      INFINITE_REPETITIONS,
      true,
    );
  }, [offset]);

  return offset;
};
