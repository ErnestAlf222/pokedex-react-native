import { POKEMON_QUERY_KEYS } from '../../core';
import { container } from '../di';
import { useCatalogQuery } from './use-catalog-query';

interface UsePokemonGenerationIndexOptions {
  enabled: boolean;
}

// Pide el índice de generaciones (9 peticiones) solo cuando se necesita y lo conserva en memoria y en la caché persistida.
export const usePokemonGenerationIndex = ({
  enabled,
}: UsePokemonGenerationIndexOptions) =>
  useCatalogQuery(
    POKEMON_QUERY_KEYS.generationIndex,
    () => container.getPokemonGenerationIndexUseCase.execute(),
    enabled,
  );
