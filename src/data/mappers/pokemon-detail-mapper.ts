import { POKEMON_SHINY_IMAGE_URL_TEMPLATE } from '../../core';
import { PokemonDetail } from '../../domain';
import { EvolutionChainDto, PokemonDto } from '../models';
import { toEvolutionStages } from './evolution-chain-mapper';
import { buildImageUrl } from './pokemon-mapper';

// Combina el Pokémon y su cadena evolutiva en un PokemonDetail; el nombre es el de la especie, igual que en el listado.
export const toPokemonDetail = (
  pokemon: PokemonDto,
  chain: EvolutionChainDto,
): PokemonDetail => ({
  id: pokemon.id,
  name: pokemon.species.name,
  imageUrl: buildImageUrl(pokemon.id),
  shinyImageUrl: buildImageUrl(pokemon.id, POKEMON_SHINY_IMAGE_URL_TEMPLATE),
  types: pokemon.types.map(({ type }) => type.name),
  stats: pokemon.stats.map(({ base_stat, stat }) => ({
    name: stat.name,
    value: base_stat,
  })),
  abilities: pokemon.abilities.map(({ ability }) => ability.name),
  height: pokemon.height,
  weight: pokemon.weight,
  evolutions: toEvolutionStages(chain),
});
