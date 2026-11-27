import glyphMap from '../node_modules/@react-native-vector-icons/material-icons/glyphmaps/MaterialIcons.json';
import {
  DAMAGE_CLASS_ICONS,
  DAMAGE_CLASS_LABELS,
  FALLBACK_DAMAGE_CLASS_ICON,
  FALLBACK_TYPE_ICON,
  POKEMON_TYPES,
  TYPE_ICONS,
  getDamageClassIcon,
  getTypeIcon,
  typeColors,
} from '../src/core';

const glyphNames = new Set(Object.keys(glyphMap));

// Pruebas del mapa de íconos por tipo.
describe('íconos de tipo', () => {
  it('la lista de tipos coincide con los colores del tema (los 18 tipos)', () => {
    expect(POKEMON_TYPES).toHaveLength(18);
    expect([...POKEMON_TYPES].sort()).toEqual(Object.keys(typeColors).sort());
  });

  it('cada tipo tiene su ícono', () => {
    expect(POKEMON_TYPES.map(getTypeIcon)).toEqual(
      POKEMON_TYPES.map(type => TYPE_ICONS[type]),
    );
  });

  it('todos los íconos de tipo existen en el glyph map de Material Icons', () => {
    const missing = Object.values(TYPE_ICONS).filter(
      name => !glyphNames.has(name),
    );

    expect(missing).toEqual([]);
  });

  it('usa el ícono de respaldo con un tipo desconocido', () => {
    expect(getTypeIcon('stellar')).toBe(FALLBACK_TYPE_ICON);
  });
});

// Pruebas del mapa de íconos por clase de daño.
describe('íconos de clase de daño', () => {
  it('cubre las tres clases y todas existen en el glyph map', () => {
    expect(Object.keys(DAMAGE_CLASS_ICONS).sort()).toEqual([
      'physical',
      'special',
      'status',
    ]);
    expect(
      Object.values(DAMAGE_CLASS_ICONS).filter(name => !glyphNames.has(name)),
    ).toEqual([]);
  });

  it('devuelve el ícono de cada clase y el de respaldo si es desconocida', () => {
    expect(getDamageClassIcon('physical')).toBe(DAMAGE_CLASS_ICONS.physical);
    expect(getDamageClassIcon('special')).toBe(DAMAGE_CLASS_ICONS.special);
    expect(getDamageClassIcon('status')).toBe(DAMAGE_CLASS_ICONS.status);
    expect(getDamageClassIcon('otra')).toBe(FALLBACK_DAMAGE_CLASS_ICON);
  });

  it('cada clase tiene su etiqueta en español', () => {
    expect(Object.keys(DAMAGE_CLASS_LABELS).sort()).toEqual(
      Object.keys(DAMAGE_CLASS_ICONS).sort(),
    );
  });

  it('los íconos de respaldo también existen en el glyph map', () => {
    expect(glyphNames.has(FALLBACK_TYPE_ICON)).toBe(true);
    expect(glyphNames.has(FALLBACK_DAMAGE_CLASS_ICON)).toBe(true);
  });
});
