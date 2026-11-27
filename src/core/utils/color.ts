import { STAT_LEVEL_THRESHOLDS } from '../config';
import {
  colors,
  effects,
  fallbackTypeColor,
  statColors,
  typeColors,
} from '../theme';

const HEX_RADIX = 16;
const CHANNEL_LENGTH = 2;
const MAX_CHANNEL = 255;
const CHANNEL_PATTERN = /.{2}/g;
const LUMINANCE_WEIGHTS = [0.2126, 0.7152, 0.0722] as const;
const SRGB_LINEAR_LIMIT = 0.03928;
const SRGB_LINEAR_DIVISOR = 12.92;
const SRGB_OFFSET = 0.055;
const SRGB_SCALE = 1.055;
const SRGB_GAMMA = 2.4;
const CONTRAST_OFFSET = 0.05;

// Oscurece un color #RRGGBB multiplicando cada canal por (1 - factor).
export const darkenColor = (hex: string, factor: number): string => {
  const channels = (hex.slice(1).match(CHANNEL_PATTERN) ?? []).map(channel =>
    Math.round(parseInt(channel, HEX_RADIX) * (1 - factor))
      .toString(HEX_RADIX)
      .padStart(CHANNEL_LENGTH, '0')
      .toUpperCase(),
  );
  return `#${channels.join('')}`;
};

// Aclara un color #RRGGBB acercando cada canal al blanco según el factor (0 = igual, 1 = blanco).
export const lightenColor = (hex: string, factor: number): string => {
  const channels = (hex.slice(1).match(CHANNEL_PATTERN) ?? []).map(channel =>
    Math.round(
      parseInt(channel, HEX_RADIX) +
        (MAX_CHANNEL - parseInt(channel, HEX_RADIX)) * factor,
    )
      .toString(HEX_RADIX)
      .padStart(CHANNEL_LENGTH, '0')
      .toUpperCase(),
  );
  return `#${channels.join('')}`;
};

// Convierte un color #RRGGBB en rgba con la opacidad indicada.
export const withAlpha = (hex: string, alpha: number): string => {
  const [red = 0, green = 0, blue = 0] = (
    hex.slice(1).match(CHANNEL_PATTERN) ?? []
  ).map(channel => parseInt(channel, HEX_RADIX));
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

// Devuelve el color del tipo, o el de respaldo si el tipo es desconocido.
export const getTypeColor = (type: string): string =>
  typeColors[type] ?? fallbackTypeColor;

// Calcula los dos colores del gradiente: uno por tipo, o el color y su variante oscura.
export const getGradientColors = (types: string[]): [string, string] => {
  const [first = fallbackTypeColor, second] = types.map(getTypeColor);
  return [first, second ?? darkenColor(first, effects.darkenFactor)];
};

// Color de una barra de stat según su tramo: bajo, medio o alto.
export const getStatColor = (value: number): string => {
  if (value >= STAT_LEVEL_THRESHOLDS.high) {
    return statColors.high;
  }
  return value >= STAT_LEVEL_THRESHOLDS.medium
    ? statColors.medium
    : statColors.low;
};

// Luminancia relativa (WCAG) de un color #RRGGBB: 0 es negro y 1 es blanco.
const getLuminance = (hex: string): number =>
  (hex.slice(1).match(CHANNEL_PATTERN) ?? [])
    .map(channel => parseInt(channel, HEX_RADIX) / MAX_CHANNEL)
    .map(value =>
      value <= SRGB_LINEAR_LIMIT
        ? value / SRGB_LINEAR_DIVISOR
        : ((value + SRGB_OFFSET) / SRGB_SCALE) ** SRGB_GAMMA,
    )
    .reduce((sum, value, index) => sum + value * LUMINANCE_WEIGHTS[index]!, 0);

// Relación de contraste (WCAG) entre dos colores #RRGGBB.
const getContrastRatio = (first: string, second: string): number => {
  const [lighter = 0, darker = 0] = [
    getLuminance(first),
    getLuminance(second),
  ].sort((a, b) => b - a);
  return (lighter + CONTRAST_OFFSET) / (darker + CONTRAST_OFFSET);
};

// Color de texto legible sobre el fondo: el claro o el oscuro de la app, el que dé más contraste.
export const getReadableTextColor = (background: string): string =>
  getContrastRatio(background, colors.onGradient) >=
  getContrastRatio(background, colors.textPrimary)
    ? colors.onGradient
    : colors.textPrimary;
