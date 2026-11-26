import {
  POKEAPI_BASE_URL,
  POKEMON_ENDPOINT,
  POKEMON_QUERY_PARAMS,
  POKEMON_SPECIES_ENDPOINT,
  getJson,
} from '../../core';
import {
  EvolutionChainDto,
  PokemonDto,
  PokemonListDto,
  PokemonSpeciesDto,
} from '../models';

// Arma la URL completa de un recurso de PokéAPI a partir de su ruta.
const pokeApiUrl = (path: string): string => `${POKEAPI_BASE_URL}${path}`;

// Fuente de datos remota que consulta PokéAPI.
export class PokemonRemoteDataSource {
  // Pide al endpoint de especies la página indicada por offset y límite (sin formas alternativas).
  getPokemonList(offset: number, limit: number): Promise<PokemonListDto> {
    const query = new URLSearchParams({
      [POKEMON_QUERY_PARAMS.offset]: String(offset),
      [POKEMON_QUERY_PARAMS.limit]: String(limit),
    });
    return getJson<PokemonListDto>(
      pokeApiUrl(`${POKEMON_SPECIES_ENDPOINT}?${query.toString()}`),
    );
  }

  // Pide los datos básicos de un Pokémon por id.
  getPokemon(id: number): Promise<PokemonDto> {
    return getJson<PokemonDto>(pokeApiUrl(`${POKEMON_ENDPOINT}/${id}`));
  }

  // Pide la especie de un Pokémon por id, que apunta a su cadena evolutiva.
  getPokemonSpecies(id: number): Promise<PokemonSpeciesDto> {
    return getJson<PokemonSpeciesDto>(
      pokeApiUrl(`${POKEMON_SPECIES_ENDPOINT}/${id}`),
    );
  }

  // Pide la cadena evolutiva usando la URL que entrega la especie.
  getEvolutionChain(url: string): Promise<EvolutionChainDto> {
    return getJson<EvolutionChainDto>(url);
  }
}
