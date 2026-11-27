import {
  POKEMON_TYPES,
  formatMultiplier,
  isHighlightedMultiplier,
} from '../src/core';
import { TypeEffectiveness, completeTypeMultipliers } from '../src/domain';

// Pruebas del texto de los multiplicadores de daño.
describe('formatMultiplier', () => {
  it.each([
    [4, '×4'],
    [2, '×2'],
    [1, '×1'],
    [0.5, '×½'],
    [0.25, '×¼'],
    [0, '×0'],
  ])('convierte %s en %s', (multiplier, text) => {
    expect(formatMultiplier(multiplier)).toBe(text);
  });
});

// Pruebas de qué multiplicadores se destacan en la matriz.
describe('isHighlightedMultiplier', () => {
  it('no destaca el ×1', () => {
    expect(isHighlightedMultiplier(1)).toBe(false);
  });

  it.each([4, 2, 0.5, 0.25, 0])('destaca el ×%s', multiplier => {
    expect(isHighlightedMultiplier(multiplier)).toBe(true);
  });
});

// Pruebas de la matriz completa: un multiplicador por tipo, con ×1 para los que no se mencionan.
describe('completeTypeMultipliers', () => {
  const effectiveness: TypeEffectiveness = {
    weaknesses: [{ type: 'fire', multiplier: 2 }],
    resistances: [{ type: 'grass', multiplier: 0.25 }],
    immunities: [{ type: 'ground', multiplier: 0 }],
  };
  const matrix = completeTypeMultipliers(effectiveness, POKEMON_TYPES);

  it('devuelve los 18 tipos en el orden de la lista', () => {
    expect(matrix).toHaveLength(18);
    expect(matrix.map(({ type }) => type)).toEqual([...POKEMON_TYPES]);
  });

  it('conserva debilidades, resistencias e inmunidades', () => {
    const byType = new Map(
      matrix.map(({ type, multiplier }) => [type, multiplier]),
    );

    expect(byType.get('fire')).toBe(2);
    expect(byType.get('grass')).toBe(0.25);
    expect(byType.get('ground')).toBe(0);
  });

  it('pone ×1 en los tipos que la efectividad no menciona', () => {
    expect(matrix.filter(({ multiplier }) => multiplier === 1)).toHaveLength(
      15,
    );
  });
});
