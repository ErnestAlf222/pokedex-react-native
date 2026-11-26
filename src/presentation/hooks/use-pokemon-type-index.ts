import { useQuery } from '@tanstack/react-query';
import {
  POKEMON_QUERY_KEYS,
  TYPE_INDEX_GC_TIME_MS,
  TYPE_INDEX_STALE_TIME_MS,
} from '../../core';
import { container } from '../di';

// Pide el índice de tipos una vez y lo conserva en memoria y en la caché persistida.
export const usePokemonTypeIndex = () =>
  useQuery({
    queryKey: POKEMON_QUERY_KEYS.typeIndex,
    queryFn: () => container.getPokemonTypeIndexUseCase.execute(),
    staleTime: TYPE_INDEX_STALE_TIME_MS,
    gcTime: TYPE_INDEX_GC_TIME_MS,
  });
