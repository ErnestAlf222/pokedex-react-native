import { DAMAGE_MULTIPLIERS } from '../src/core';
import { toTypeDamageRelations } from '../src/data';
import { calculateTypeEffectiveness } from '../src/domain';
import {
  ghostTypeDto,
  grassTypeDto,
  poisonTypeDto,
} from '../__fixtures__/pokemon-data';

// Pruebas del mapper de relaciones de daño con datos reales de /type/grass.
describe('toTypeDamageRelations', () => {
  it('extrae los nombres de cada lista de daño recibido', () => {
    expect(toTypeDamageRelations(grassTypeDto)).toEqual({
      doubleDamageFrom: ['flying', 'poison', 'bug', 'fire', 'ice'],
      halfDamageFrom: ['ground', 'water', 'grass', 'electric'],
      noDamageFrom: [],
    });
  });
});

// Pruebas de la combinación de tipos con Bulbasaur (planta/veneno) y Gengar (fantasma/veneno).
describe('calculateTypeEffectiveness', () => {
  const bulbasaur = calculateTypeEffectiveness(
    [grassTypeDto, poisonTypeDto].map(toTypeDamageRelations),
  );
  const gengar = calculateTypeEffectiveness(
    [ghostTypeDto, poisonTypeDto].map(toTypeDamageRelations),
  );
  const { weak, resistant, immune } = DAMAGE_MULTIPLIERS;

  it('Bulbasaur: debilidades x2 a fuego, volador, hielo y psíquico', () => {
    expect(bulbasaur.weaknesses).toEqual([
      { type: 'fire', multiplier: weak },
      { type: 'flying', multiplier: weak },
      { type: 'ice', multiplier: weak },
      { type: 'psychic', multiplier: weak },
    ]);
  });

  it('Bulbasaur: planta x0.25 y el resto de resistencias x0.5, de mayor a menor', () => {
    expect(bulbasaur.resistances).toEqual([
      { type: 'grass', multiplier: resistant * resistant },
      { type: 'electric', multiplier: resistant },
      { type: 'fairy', multiplier: resistant },
      { type: 'fighting', multiplier: resistant },
      { type: 'water', multiplier: resistant },
    ]);
  });

  it('Bulbasaur: sin inmunidades, y bicho y tierra quedan neutros (x2 por un tipo y x0.5 por el otro)', () => {
    expect(bulbasaur.immunities).toEqual([]);
    const listed = [...bulbasaur.weaknesses, ...bulbasaur.resistances].map(
      ({ type }) => type,
    );
    expect(listed).not.toContain('bug');
    expect(listed).not.toContain('ground');
  });

  it('Gengar: inmune a normal y lucha', () => {
    expect(gengar.immunities).toEqual([
      { type: 'fighting', multiplier: immune },
      { type: 'normal', multiplier: immune },
    ]);
  });

  it('Gengar: la inmunidad prevalece y las debilidades son fantasma, siniestro, tierra y psíquico', () => {
    expect(gengar.weaknesses.map(({ type }) => type)).toEqual([
      'dark',
      'ghost',
      'ground',
      'psychic',
    ]);
    expect(gengar.weaknesses.map(({ multiplier }) => multiplier)).toEqual([
      weak,
      weak,
      weak,
      weak,
    ]);
    expect(gengar.resistances).toEqual([
      { type: 'bug', multiplier: resistant * resistant },
      { type: 'poison', multiplier: resistant * resistant },
      { type: 'fairy', multiplier: resistant },
      { type: 'grass', multiplier: resistant },
    ]);
  });

  it('un solo tipo no combina nada y sin tipos no hay relaciones', () => {
    const single = calculateTypeEffectiveness([
      toTypeDamageRelations(ghostTypeDto),
    ]);

    expect(single.immunities.map(({ type }) => type)).toEqual([
      'fighting',
      'normal',
    ]);
    expect(calculateTypeEffectiveness([])).toEqual({
      weaknesses: [],
      resistances: [],
      immunities: [],
    });
  });
});
