import { getTypeColor, getTypeIcon, getTypeLabel } from '../../core';
import { IconCircle } from './icon-circle';

interface TypeIconProps {
  type: string;
  small?: boolean;
}

// Círculo del color del tipo con su ícono; grande para la matriz de efectividad y pequeño para las tarjetas de movimientos.
export const TypeIcon = ({ type, small = false }: TypeIconProps) => (
  <IconCircle
    icon={getTypeIcon(type)}
    color={getTypeColor(type)}
    small={small}
    accessibilityLabel={getTypeLabel(type)}
  />
);
