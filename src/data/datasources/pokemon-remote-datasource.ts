import {
  INITIAL_OFFSET,
  POKEAPI_BASE_URL,
  POKEMON_ENDPOINT,
  POKEMON_FULL_LIST_LIMIT,
  POKEMON_QUERY_PARAMS,
  POKEMON_SPECIES_ENDPOINT,
  TYPE_ENDPOINT,
  getJson,
} from '../../core';
import {
  EvolutionChainDto,
  PokemonDto,
  PokemonListDto,
  PokemonSpeciesDto,
  TypeDto,
} from '../models';

// Arma la URL completa de un recurso de PokéAPI a partir de su ruta.
const pokeApiUrl = (path: string): string => `${POKEAPI_BASE_URL}${path}`;

// Arma la URL de un listado paginado de PokéAPI con su offset y límite.
const listUrl = (endpoint: string, offset: number, limit: number): string => {
  const query = new URLSearchParams({
    [POKEMON_QUERY_PARAMS.offset]: String(offset),
    [POKEMON_QUERY_PARAMS.limit]: String(limit),
  });
  return pokeApiUrl(`${endpoint}?${query.toString()}`);
};

// Fuente de datos remota que consulta PokéAPI.
export class PokemonRemoteDataSource {
  // Pide al endpoint de especies la página indicada por offset y límite (sin formas alternativas).
  getPokemonList(offset: number, limit: number): Promise<PokemonListDto> {
    return getJson<PokemonListDto>(
      listUrl(POKEMON_SPECIES_ENDPOINT, offset, limit),
    );
  }

  // Pide la lista completa de especies en una sola respuesta.
  getAllPokemon(): Promise<PokemonListDto> {
    return this.getPokemonList(INITIAL_OFFSET, POKEMON_FULL_LIST_LIMIT);
  }

  // Pide la lista de tipos y luego cada tipo en paralelo.
  async getAllTypes(): Promise<TypeDto[]> {
    const list = await getJson<PokemonListDto>(
      listUrl(TYPE_ENDPOINT, INITIAL_OFFSET, POKEMON_FULL_LIST_LIMIT),
    );
    return Promise.all(list.results.map(({ url }) => getJson<TypeDto>(url)));
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
