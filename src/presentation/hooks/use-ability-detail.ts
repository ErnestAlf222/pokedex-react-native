import { POKEMON_QUERY_KEYS } from '../../core';
import { container } from '../di';
import { useCatalogQuery } from './use-catalog-query';

// Consulta el detalle de una habilidad por nombre (una consulta por habilidad, cacheada y persistida).
export const useAbilityDetail = (name: string) =>
  useCatalogQuery(POKEMON_QUERY_KEYS.ability(name), () =>
    container.getAbilityDetailUseCase.execute(name),
  );
