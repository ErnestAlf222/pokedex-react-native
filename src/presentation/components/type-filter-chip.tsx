import { LayoutChangeEvent } from 'react-native';
import { getChipColor, getChipIcon, getChipLabel } from '../../core';
import { FilterChip } from './filter-chip';

interface TypeFilterChipProps {
  type: string;
  isActive: boolean;
  onPress: (type: string) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

// Chip de filtro de un tipo (o "Todos"): pone su color, ícono y etiqueta en el chip común.
export const TypeFilterChip = ({
  type,
  isActive,
  onPress,
  onLayout,
}: TypeFilterChipProps) => (
  <FilterChip
    label={getChipLabel(type)}
    color={getChipColor(type)}
    icon={getChipIcon(type)}
    isActive={isActive}
    onPress={() => onPress(type)}
    onLayout={onLayout}
  />
);
