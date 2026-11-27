import {
  ABILITY_ENDPOINT,
  GENERATION_ENDPOINT,
  INITIAL_OFFSET,
  MOVE_ENDPOINT,
  POKEAPI_BASE_URL,
  POKEMON_ENDPOINT,
  POKEMON_FULL_LIST_LIMIT,
  POKEMON_QUERY_PARAMS,
  POKEMON_SPECIES_ENDPOINT,
  TYPE_ENDPOINT,
  getJson,
} from '../../core';
import {
  AbilityDto,
  EvolutionChainDto,
  GenerationDto,
  MoveDto,
  PokemonDto,
  PokemonListDto,
  PokemonSpeciesDto,
  TypeDamageRelationsDto,
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

  // Pide la lista de un endpoint y luego cada elemento en paralelo.
  private async getAllOf<T>(endpoint: string): Promise<T[]> {
    const list = await getJson<PokemonListDto>(
      listUrl(endpoint, INITIAL_OFFSET, POKEMON_FULL_LIST_LIMIT),
    );
    return Promise.all(list.results.map(({ url }) => getJson<T>(url)));
  }

  // Pide todos los tipos.
  getAllTypes(): Promise<TypeDto[]> {
    return this.getAllOf<TypeDto>(TYPE_ENDPOINT);
  }

  // Pide todas las generaciones, cada una con su lista de especies.
  getAllGenerations(): Promise<GenerationDto[]> {
    return this.getAllOf<GenerationDto>(GENERATION_ENDPOINT);
  }

  // Pide las relaciones de daño de cada tipo en paralelo, en el mismo orden recibido.
  getTypeDamageRelations(
    typeNames: string[],
  ): Promise<TypeDamageRelationsDto[]> {
    return Promise.all(
      typeNames.map(name =>
        getJson<TypeDamageRelationsDto>(pokeApiUrl(`${TYPE_ENDPOINT}/${name}`)),
      ),
    );
  }

  // Pide un movimiento por nombre.
  getMove(name: string): Promise<MoveDto> {
    return getJson<MoveDto>(pokeApiUrl(`${MOVE_ENDPOINT}/${name}`));
  }

  // Pide una habilidad por nombre.
  getAbility(name: string): Promise<AbilityDto> {
    return getJson<AbilityDto>(pokeApiUrl(`${ABILITY_ENDPOINT}/${name}`));
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
