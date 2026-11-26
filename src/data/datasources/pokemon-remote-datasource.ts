import {
  POKEAPI_BASE_URL,
  POKEMON_ENDPOINT,
  POKEMON_QUERY_PARAMS,
  getJson,
} from '../../core';
import { PokemonListDto } from '../models';

export class PokemonRemoteDataSource {
  getPokemonList(offset: number, limit: number): Promise<PokemonListDto> {
    const query = new URLSearchParams({
      [POKEMON_QUERY_PARAMS.offset]: String(offset),
      [POKEMON_QUERY_PARAMS.limit]: String(limit),
    });
    return getJson<PokemonListDto>(
      `${POKEAPI_BASE_URL}${POKEMON_ENDPOINT}?${query.toString()}`,
    );
  }
}
