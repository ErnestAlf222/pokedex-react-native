import { STAT_LEVEL_THRESHOLDS } from '../config';
import { effects, fallbackTypeColor, statColors, typeColors } from '../theme';

const HEX_RADIX = 16;
const CHANNEL_LENGTH = 2;
const MAX_CHANNEL = 255;
const CHANNEL_PATTERN = /.{2}/g;

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
