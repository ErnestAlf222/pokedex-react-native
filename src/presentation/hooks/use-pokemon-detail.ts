import { useQuery } from '@tanstack/react-query';
import { POKEMON_DETAIL_STALE_TIME_MS, POKEMON_QUERY_KEYS } from '../../core';
import { container } from '../di';

// Consulta el detalle de un Pokémon por id.
export const usePokemonDetail = (id: number) =>
  useQuery({
    queryKey: POKEMON_QUERY_KEYS.detail(id),
    queryFn: () => container.getPokemonDetailUseCase.execute(id),
    staleTime: POKEMON_DETAIL_STALE_TIME_MS,
  });
