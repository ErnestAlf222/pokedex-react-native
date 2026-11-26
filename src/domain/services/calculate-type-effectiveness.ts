import { DAMAGE_MULTIPLIERS } from '../../core';
import {
  TypeDamageRelations,
  TypeEffectiveness,
  TypeMultiplier,
} from '../entities';

type Factor = [type: string, factor: number];

// Convierte las relaciones de un tipo en pares (tipo atacante, factor de daño).
const toFactors = ({
  doubleDamageFrom,
  halfDamageFrom,
  noDamageFrom,
}: TypeDamageRelations): Factor[] => [
  ...doubleDamageFrom.map((type): Factor => [type, DAMAGE_MULTIPLIERS.weak]),
  ...halfDamageFrom.map((type): Factor => [type, DAMAGE_MULTIPLIERS.resistant]),
  ...noDamageFrom.map((type): Factor => [type, DAMAGE_MULTIPLIERS.immune]),
];

// Ordena por multiplicador (ascendente o descendente) y, a igualdad, por nombre.
const sortBy =
  (direction: 1 | -1) =>
  (a: TypeMultiplier, b: TypeMultiplier): number =>
    direction * (a.multiplier - b.multiplier) || a.type.localeCompare(b.type);

// Combina los tipos del Pokémon multiplicando los factores y clasifica en debilidades, resistencias e inmunidades.
export const calculateTypeEffectiveness = (
  relations: TypeDamageRelations[],
): TypeEffectiveness => {
  const multipliers = relations
    .flatMap(toFactors)
    .reduce(
      (acc, [type, factor]) =>
        acc.set(type, (acc.get(type) ?? DAMAGE_MULTIPLIERS.neutral) * factor),
      new Map<string, number>(),
    );
  const entries = [...multipliers].map(([type, multiplier]) => ({
    type,
    multiplier,
  }));

  return {
    weaknesses: entries
      .filter(({ multiplier }) => multiplier > DAMAGE_MULTIPLIERS.neutral)
      .sort(sortBy(-1)),
    resistances: entries
      .filter(
        ({ multiplier }) =>
          multiplier > DAMAGE_MULTIPLIERS.immune &&
          multiplier < DAMAGE_MULTIPLIERS.neutral,
      )
      .sort(sortBy(1)),
    immunities: entries
      .filter(({ multiplier }) => multiplier === DAMAGE_MULTIPLIERS.immune)
      .sort(sortBy(1)),
  };
};
