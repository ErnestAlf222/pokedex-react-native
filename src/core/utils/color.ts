import { effects, fallbackTypeColor, typeColors } from '../theme';

const HEX_RADIX = 16;
const CHANNEL_LENGTH = 2;
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

// Devuelve el color del tipo, o el de respaldo si el tipo es desconocido.
export const getTypeColor = (type: string): string =>
  typeColors[type] ?? fallbackTypeColor;

// Calcula los dos colores del gradiente: uno por tipo, o el color y su variante oscura.
export const getGradientColors = (types: string[]): [string, string] => {
  const [first = fallbackTypeColor, second] = types.map(getTypeColor);
  return [first, second ?? darkenColor(first, effects.darkenFactor)];
};
