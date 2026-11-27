import { POKEMON_QUERY_KEYS } from '../../core';
import { container } from '../di';
import { useCatalogQuery } from './use-catalog-query';

// Consulta el detalle de un movimiento por nombre (una consulta por movimiento, cacheada y persistida).
export const useMoveDetail = (name: string) =>
  useCatalogQuery(POKEMON_QUERY_KEYS.move(name), () =>
    container.getMoveDetailUseCase.execute(name),
  );
