import {
  SORT_ORDERS,
  SORT_ORDER_ICONS,
  SORT_ORDER_LABELS,
  SortOrder,
  UI_MESSAGES,
  colors,
  getLabel,
} from '../../core';
import { FilterChip } from './filter-chip';
import { FilterSection } from './filter-section';

interface SortOptionsProps {
  selected: SortOrder;
  onSelect: (order: SortOrder) => void;
}

// Sección "Orden": una opción por criterio (número ascendente o descendente, nombre) con su ícono.
export const SortOptions = ({ selected, onSelect }: SortOptionsProps) => (
  <FilterSection title={UI_MESSAGES.order}>
    {SORT_ORDERS.map(order => (
      <FilterChip
        key={order}
        label={getLabel(SORT_ORDER_LABELS, order)}
        color={colors.primary}
        icon={SORT_ORDER_ICONS[order]}
        isActive={selected === order}
        onPress={() => onSelect(order)}
      />
    ))}
  </FilterSection>
);
