import { MAX_STAT_VALUE } from '../config';

// Calcula el porcentaje (0 a 1) de un stat respecto al máximo, acotado.
export const getStatRatio = (
  value: number,
  max: number = MAX_STAT_VALUE,
): number => Math.min(Math.max(value / max, 0), 1);
