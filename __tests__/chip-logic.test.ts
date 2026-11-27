import glyphMap from '../node_modules/@react-native-vector-icons/material-icons/glyphmaps/MaterialIcons.json';
import {
  ALL_TYPES_ICON,
  ALL_TYPES_VALUE,
  POKEMON_TYPES,
  TYPE_ICONS,
  UI_MESSAGES,
  colors,
  effects,
  getChipAppearance,
  getChipIcon,
  getChipLabel,
  getChipScrollOffset,
  getReadableTextColor,
  getTypeColor,
  getTypeLabel,
  withAlpha,
} from '../src/core';

const glyphNames = new Set(Object.keys(glyphMap));

// Pruebas de los colores de un chip seleccionado y no seleccionado.
describe('getChipAppearance', () => {
  it('seleccionado: relleno con el color del tipo y texto legible sobre él', () => {
    const color = getTypeColor('fire');
    const readable = getReadableTextColor(color);

    expect(getChipAppearance('fire', true)).toEqual({
      backgroundColor: color,
      borderColor: color,
      labelColor: readable,
      iconBackground: withAlpha(readable, effects.glassOpacity),
      iconColor: readable,
    });
  });

  it('no seleccionado: fondo tenue del tipo, borde sutil y texto oscuro', () => {
    const color = getTypeColor('water');

    expect(getChipAppearance('water', false)).toEqual({
      backgroundColor: withAlpha(color, effects.chipInactiveOpacity),
      borderColor: withAlpha(color, effects.chipBorderOpacity),
      labelColor: colors.textPrimary,
      iconBackground: color,
      iconColor: getReadableTextColor(color),
    });
  });

  it('"Todos" usa el color de marca', () => {
    expect(getChipAppearance(ALL_TYPES_VALUE, true).backgroundColor).toBe(
      colors.primary,
    );
    expect(getChipAppearance(ALL_TYPES_VALUE, false).iconBackground).toBe(
      colors.primary,
    );
  });

  it('el borde del chip inactivo es más visible que su fondo', () => {
    expect(effects.chipBorderOpacity).toBeGreaterThan(
      effects.chipInactiveOpacity,
    );
  });

  it('cada tipo usa un color distinto al seleccionarse', () => {
    const fills = POKEMON_TYPES.map(
      type => getChipAppearance(type, true).backgroundColor,
    );

    expect(new Set(fills).size).toBe(POKEMON_TYPES.length);
  });
});

// Pruebas del ícono y la etiqueta de "Todos" y de los 18 tipos.
describe('ícono y etiqueta del chip', () => {
  it('"Todos" tiene su propio ícono, que existe en el glyph map', () => {
    expect(getChipIcon(ALL_TYPES_VALUE)).toBe(ALL_TYPES_ICON);
    expect(glyphNames.has(ALL_TYPES_ICON)).toBe(true);
  });

  it('los 18 tipos usan el ícono del mapa de tipos', () => {
    expect(POKEMON_TYPES.map(getChipIcon)).toEqual(
      POKEMON_TYPES.map(type => TYPE_ICONS[type]),
    );
  });

  it('ningún ícono de chip se repite entre "Todos" y los tipos', () => {
    const icons = [ALL_TYPES_VALUE, ...POKEMON_TYPES].map(getChipIcon);

    expect(new Set(icons).size).toBe(icons.length);
  });

  it('la etiqueta es "Todos" o el nombre del tipo en español', () => {
    expect(getChipLabel(ALL_TYPES_VALUE)).toBe(UI_MESSAGES.allTypes);
    expect(getChipLabel('fire')).toBe(getTypeLabel('fire'));
    expect(getChipLabel('ghost')).toBe('Fantasma');
  });
});

// Pruebas del desplazamiento que deja un chip visible en la fila.
describe('getChipScrollOffset', () => {
  it('centra el chip en la zona visible', () => {
    expect(getChipScrollOffset(500, 100, 400)).toBe(350);
  });

  it('nunca es negativo para los primeros chips', () => {
    expect(getChipScrollOffset(16, 80, 400)).toBe(0);
  });
});
