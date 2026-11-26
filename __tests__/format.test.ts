import { formatSlug } from '../src/core';

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
