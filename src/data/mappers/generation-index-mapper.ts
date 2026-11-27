import { formatSlug, pickLocalizedText } from '../../core';
import { PokemonGenerationIndex } from '../../domain';
import { GenerationDto } from '../models';
import { extractId } from './pokemon-mapper';

// Construye el índice de generaciones: su lista ordenada (nombre en español y región) y el id de especie → generación.
export const toPokemonGenerationIndex = (
  generations: GenerationDto[],
): PokemonGenerationIndex => ({
  generations: generations
    .map(({ id, name, main_region, names }) => ({
      id,
      name: pickLocalizedText(names, entry => entry.name) || formatSlug(name),
      region: main_region.name,
    }))
    .sort((a, b) => a.id - b.id),
  bySpecies: Object.fromEntries(
    generations.flatMap(({ id, pokemon_species }) =>
      pokemon_species.map(({ url }) => [extractId(url), id] as const),
    ),
  ),
});
