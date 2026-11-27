import {
  ALL_TYPES_ICON,
  ALL_TYPES_VALUE,
  TypeIconName,
  UI_MESSAGES,
} from '../config';
import { colors, effects } from '../theme';
import { getReadableTextColor, getTypeColor, withAlpha } from './color';
import { getTypeLabel } from './format';
import { getTypeIcon } from './icons';

export interface ChipAppearance {
  backgroundColor: string;
  borderColor: string;
  labelColor: string;
  iconBackground: string;
  iconColor: string;
}

// Color base del chip de un tipo: el del tipo, o el de marca para "Todos".
export const getChipColor = (type: string): string =>
  type === ALL_TYPES_VALUE ? colors.primary : getTypeColor(type);

// Colores de un chip de cualquier color base: relleno con texto legible si está seleccionado; fondo tenue con borde sutil si no.
export const getColorChipAppearance = (
  color: string,
  isActive: boolean,
): ChipAppearance =>
  isActive
    ? {
        backgroundColor: color,
        borderColor: color,
        labelColor: getReadableTextColor(color),
        iconBackground: withAlpha(
          getReadableTextColor(color),
          effects.glassOpacity,
        ),
        iconColor: getReadableTextColor(color),
      }
    : {
        backgroundColor: withAlpha(color, effects.chipInactiveOpacity),
        borderColor: withAlpha(color, effects.chipBorderOpacity),
        labelColor: colors.textPrimary,
        iconBackground: color,
        iconColor: getReadableTextColor(color),
      };

// Colores del chip de un tipo ("Todos" usa el color de marca).
export const getChipAppearance = (
  type: string,
  isActive: boolean,
): ChipAppearance => getColorChipAppearance(getChipColor(type), isActive);

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
