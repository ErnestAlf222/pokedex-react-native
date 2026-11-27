import { UI_MESSAGES, formatMoveLevel, formatSlug } from '../src/core';

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
