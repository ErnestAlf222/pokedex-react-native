import { useInfiniteQuery } from '@tanstack/react-query';
import { INITIAL_OFFSET, POKEMON_QUERY_KEYS } from '../../core';
import { container } from '../di';

// Consulta infinita del listado de Pokémon, aplanado en una sola lista.
export const usePokemonList = () =>
  useInfiniteQuery({
    queryKey: POKEMON_QUERY_KEYS.list,
    queryFn: ({ pageParam }) =>
      container.getPokemonPageUseCase.execute(pageParam),
    initialPageParam: INITIAL_OFFSET,
    getNextPageParam: lastPage => lastPage.nextOffset ?? undefined,
    select: data => data.pages.flatMap(page => page.items),
  });
