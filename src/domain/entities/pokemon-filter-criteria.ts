import { SortOrder } from '../../core';

// Criterios del listado: texto buscado, tipo ("" = todos), generación (0 = todas) y orden.
export interface PokemonFilterCriteria {
  query: string;
  type: string;
  generation: number;
  order: SortOrder;
}
