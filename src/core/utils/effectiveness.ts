import { DAMAGE_MULTIPLIERS } from '../config';

// Indica si el multiplicador merece destacarse: cualquiera distinto de ×1.
export const isHighlightedMultiplier = (multiplier: number): boolean =>
  multiplier !== DAMAGE_MULTIPLIERS.neutral;
