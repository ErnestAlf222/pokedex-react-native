import { PokemonDetail } from '../../domain';
import { EvolutionChainDto, PokemonDto } from '../models';
import { toEvolutionStages } from './evolution-chain-mapper';
import { buildImageUrl } from './pokemon-mapper';

// Combina el Pokémon y su cadena evolutiva en un PokemonDetail de dominio.
export const toPokemonDetail = (
  pokemon: PokemonDto,
  chain: EvolutionChainDto,
): PokemonDetail => ({
  id: pokemon.id,
  name: pokemon.name,
  imageUrl: buildImageUrl(pokemon.id),
  types: pokemon.types.map(({ type }) => type.name),
  stats: pokemon.stats.map(({ base_stat, stat }) => ({
    name: stat.name,
    value: base_stat,
  })),
  abilities: pokemon.abilities.map(({ ability }) => ability.name),
  height: pokemon.height,
  weight: pokemon.weight,
  spriteFront: pokemon.sprites.front_default,
  spriteBack: pokemon.sprites.back_default,
  evolutions: toEvolutionStages(chain),
});
