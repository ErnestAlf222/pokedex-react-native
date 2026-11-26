import {
  STAT_LEVEL_THRESHOLDS,
  formatMultiplier,
  getStatColor,
  statColors,
} from '../src/core';

// Pruebas del color por tramo de las barras de stat.
describe('getStatColor', () => {
  it('usa el color bajo por debajo del umbral medio', () => {
    expect(getStatColor(STAT_LEVEL_THRESHOLDS.medium - 1)).toBe(statColors.low);
  });

  it('usa el color medio desde el umbral medio hasta antes del alto', () => {
    expect(getStatColor(STAT_LEVEL_THRESHOLDS.medium)).toBe(statColors.medium);
    expect(getStatColor(STAT_LEVEL_THRESHOLDS.high - 1)).toBe(
      statColors.medium,
    );
  });

  it('usa el color alto desde el umbral alto', () => {
    expect(getStatColor(STAT_LEVEL_THRESHOLDS.high)).toBe(statColors.high);
    expect(getStatColor(255)).toBe(statColors.high);
  });
});

// Pruebas de la etiqueta de multiplicadores de daño.
describe('formatMultiplier', () => {
  it('formatea los multiplicadores habituales', () => {
    expect(formatMultiplier(4)).toBe('×4');
    expect(formatMultiplier(2)).toBe('×2');
    expect(formatMultiplier(0.5)).toBe('×½');
    expect(formatMultiplier(0.25)).toBe('×¼');
  });

  it('usa el número si no hay etiqueta', () => {
    expect(formatMultiplier(3)).toBe('×3');
  });
});
