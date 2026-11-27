import { useEffect, useState } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { FILTER_SHEET_DURATION_MS, effects, sizes } from '../../core';

// Anima un panel inferior: oscurece el fondo y desliza la hoja; mantiene el Modal montado hasta que termina de cerrarse.
export const useSheetTransition = (visible: boolean) => {
  const [mounted, setMounted] = useState(visible);
  const progress = useSharedValue(0);

  // Abre montando primero; al cerrar desmonta cuando acaba la animación.
  useEffect(() => {
    if (visible) {
      setMounted(true);
      progress.value = withTiming(1, { duration: FILTER_SHEET_DURATION_MS });
      return;
    }
    progress.value = withTiming(
      0,
      { duration: FILTER_SHEET_DURATION_MS },
      finished => {
        if (finished) {
          scheduleOnRN(setMounted, false);
        }
      },
    );
  }, [visible, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * effects.backdropOpacity,
  }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * sizes.filterSheetTravel }],
  }));

  return { mounted, backdropStyle, sheetStyle };
};
