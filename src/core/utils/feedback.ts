import { Vibration } from 'react-native';
import { VIBRATION_MS } from '../config';

// Vibración corta de confirmación para las interacciones del detalle.
export const vibrate = (): void => Vibration.vibrate(VIBRATION_MS);
