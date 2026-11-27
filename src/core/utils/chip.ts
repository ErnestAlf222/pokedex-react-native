import {
  ALL_TYPES_ICON,
  ALL_TYPES_VALUE,
  TypeIconName,
  UI_MESSAGES,
} from '../config';
import { colors, effects } from '../theme';
import { getTypeColor, withAlpha } from './color';
import { getTypeLabel } from './format';
import { getTypeIcon } from './icons';

export interface ChipAppearance {
  backgroundColor: string;
  borderColor: string;
  labelColor: string;
  iconBackground: string;
}

// Color base del chip: el del tipo, o el de marca para "Todos".
const getChipColor = (type: string): string =>
  type === ALL_TYPES_VALUE ? colors.primary : getTypeColor(type);

// Colores del chip: relleno del tipo con texto claro si está seleccionado; fondo tenue con borde sutil si no.
export const getChipAppearance = (
  type: string,
  isActive: boolean,
): ChipAppearance => {
  const color = getChipColor(type);
  return isActive
    ? {
        backgroundColor: color,
        borderColor: color,
        labelColor: colors.onGradient,
        iconBackground: withAlpha(colors.onGradient, effects.glassOpacity),
      }
    : {
        backgroundColor: withAlpha(color, effects.chipInactiveOpacity),
        borderColor: withAlpha(color, effects.chipBorderOpacity),
        labelColor: colors.textPrimary,
        iconBackground: color,
      };
};

// Ícono del chip: el propio de "Todos" o el del tipo.
export const getChipIcon = (
  type: string,
): TypeIconName | typeof ALL_TYPES_ICON =>
  type === ALL_TYPES_VALUE ? ALL_TYPES_ICON : getTypeIcon(type);

// Etiqueta en español del chip: "Todos" o el nombre del tipo.
export const getChipLabel = (type: string): string =>
  type === ALL_TYPES_VALUE ? UI_MESSAGES.allTypes : getTypeLabel(type);

// Desplazamiento horizontal que deja el chip centrado en la zona visible (nunca negativo).
export const getChipScrollOffset = (
  chipX: number,
  chipWidth: number,
  viewportWidth: number,
): number => Math.max(chipX + chipWidth / 2 - viewportWidth / 2, 0);
