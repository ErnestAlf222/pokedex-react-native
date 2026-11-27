import { DAMAGE_MULTIPLIERS } from '../../core';
import { TypeEffectiveness, TypeMultiplier } from '../entities';

// Un multiplicador por cada tipo de la lista, en su orden; los que la efectividad no menciona son neutros (×1).
export const completeTypeMultipliers = (
  { weaknesses, resistances, immunities }: TypeEffectiveness,
  types: readonly string[],
): TypeMultiplier[] => {
  const byType = new Map(
    [...weaknesses, ...resistances, ...immunities].map(
      ({ type, multiplier }) => [type, multiplier] as const,
    ),
  );
  return types.map(type => ({
    type,
    multiplier: byType.get(type) ?? DAMAGE_MULTIPLIERS.neutral,
  }));
};
