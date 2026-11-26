import { fallbackTypeColor, getGradientColors, typeColors } from '../src/core';

// Convierte #RRGGBB en sus tres canales numéricos.
const toChannels = (hex: string): number[] =>
  [1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16));

// Pruebas de la utilidad que calcula los colores del gradiente por tipo.
describe('getGradientColors', () => {
  it('usa un color por tipo cuando el Pokémon tiene dos tipos', () => {
    expect(getGradientColors(['grass', 'poison'])).toEqual([
      typeColors.grass,
      typeColors.poison,
    ]);
  });

  it('usa el color y una variante más oscura con un solo tipo', () => {
    const [base, dark] = getGradientColors(['fire']);

    expect(base).toBe(typeColors.fire);
    expect(dark).toMatch(/^#[0-9A-F]{6}$/);
    expect(dark).not.toBe(base);
    toChannels(dark).forEach((channel, index) =>
      expect(channel).toBeLessThan(toChannels(base)[index]),
    );
  });

  it('usa el color de respaldo para un tipo desconocido', () => {
    expect(getGradientColors(['desconocido'])[0]).toBe(fallbackTypeColor);
  });
});
