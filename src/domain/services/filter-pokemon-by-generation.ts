import { ALL_GENERATIONS_VALUE } from '../../core';
import { PokemonGenerationIndex, PokemonSummary } from '../entities';

// Filtra por generación usando el índice; con "Todas" devuelve toda la lista.
export const filterPokemonByGeneration = (
  list: PokemonSummary[],
  index: PokemonGenerationIndex,
  generation: number,
): PokemonSummary[] =>
  generation === ALL_GENERATIONS_VALUE
    ? list
    : list.filter(({ id }) => index.bySpecies[id] === generation);
