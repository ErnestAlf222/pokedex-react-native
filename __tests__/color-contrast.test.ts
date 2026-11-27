import {
  POKEMON_TYPES,
  colors,
  getReadableTextColor,
  getTypeColor,
} from '../src/core';

// Pruebas del color de texto legible según el fondo.
describe('getReadableTextColor', () => {
  it.each(['electric', 'ice', 'steel', 'normal'])(
    'usa texto oscuro sobre el tipo claro %s',
    type => {
      expect(getReadableTextColor(getTypeColor(type))).toBe(colors.textPrimary);
    },
  );

  it('usa texto claro sobre el tipo oscuro (Siniestro)', () => {
    expect(getReadableTextColor(getTypeColor('dark'))).toBe(colors.onGradient);
  });

  it('usa texto claro sobre el tipo fantasma', () => {
    expect(getReadableTextColor(getTypeColor('ghost'))).toBe(colors.onGradient);
  });

  it('usa texto claro sobre negro y oscuro sobre blanco', () => {
    expect(getReadableTextColor('#000000')).toBe(colors.onGradient);
    expect(getReadableTextColor('#FFFFFF')).toBe(colors.textPrimary);
  });

  it('devuelve siempre uno de los dos colores de texto de la app', () => {
    const allowed: string[] = [colors.onGradient, colors.textPrimary];

    expect(
      POKEMON_TYPES.every(type =>
        allowed.includes(getReadableTextColor(getTypeColor(type))),
      ),
    ).toBe(true);
  });
});
