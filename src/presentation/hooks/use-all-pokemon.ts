import { useQuery } from '@tanstack/react-query';
import {
  ALL_POKEMON_GC_TIME_MS,
  ALL_POKEMON_STALE_TIME_MS,
  POKEMON_QUERY_KEYS,
} from '../../core';
import { container } from '../di';

interface UseAllPokemonOptions {
  enabled: boolean;
}

// Pide la lista completa una sola vez y la conserva en memoria mientras vive la app.
export const useAllPokemon = ({ enabled }: UseAllPokemonOptions) =>
  useQuery({
    queryKey: POKEMON_QUERY_KEYS.all,
    queryFn: () => container.getAllPokemonUseCase.execute(),
    enabled,
    staleTime: ALL_POKEMON_STALE_TIME_MS,
    gcTime: ALL_POKEMON_GC_TIME_MS,
  });
