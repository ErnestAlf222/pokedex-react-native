import {
  UI_MESSAGES,
  formatLevelBadge,
  formatMoveLevel,
  formatMoveStat,
  formatSlug,
} from '../src/core';

// Pruebas del helper que convierte slugs de la API en texto legible.
describe('formatSlug', () => {
  it('capitaliza un nombre simple', () => {
    expect(formatSlug('bulbasaur')).toBe('Bulbasaur');
  });

  it('convierte guiones en espacios y capitaliza cada palabra', () => {
    expect(formatSlug('solar-power')).toBe('Solar Power');
    expect(formatSlug('mr-mime')).toBe('Mr Mime');
  });

  it('mantiene intactas las palabras ya capitalizadas', () => {
    expect(formatSlug('Keen-Eye')).toBe('Keen Eye');
  });
});

// Pruebas del texto dentro del círculo de nivel.
describe('formatLevelBadge', () => {
  it('muestra el número de nivel', () => {
    expect(formatLevelBadge(7)).toBe('7');
  });

  it('muestra "Evo." para el nivel 0', () => {
    expect(formatLevelBadge(0)).toBe(UI_MESSAGES.learnedOnEvolution);
  });
});

// Pruebas del texto de poder, precisión y PP con valores null.
describe('formatMoveStat', () => {
  it('muestra el valor con su sufijo', () => {
    expect(formatMoveStat(40)).toBe('40');
    expect(formatMoveStat(100, '%')).toBe('100%');
    expect(formatMoveStat(0)).toBe('0');
  });

  it('muestra "—" cuando la API no da la cifra (null)', () => {
    expect(formatMoveStat(null)).toBe(UI_MESSAGES.noValue);
    expect(formatMoveStat(null, '%')).toBe('—');
  });
});

// Pruebas del texto de nivel de un movimiento, con el nivel 0 como "Evo.".
describe('formatMoveLevel', () => {
  it('muestra "Nivel N" para niveles normales', () => {
    expect(formatMoveLevel(1)).toBe(`${UI_MESSAGES.level} 1`);
    expect(formatMoveLevel(81)).toBe(`${UI_MESSAGES.level} 81`);
  });

  it('muestra el texto de evolución para el nivel 0', () => {
    expect(formatMoveLevel(0)).toBe(UI_MESSAGES.learnedOnEvolution);
  });
});
