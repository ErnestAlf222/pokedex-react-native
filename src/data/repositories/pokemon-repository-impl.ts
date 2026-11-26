import {
  Page,
  PokemonDetail,
  PokemonRepository,
  PokemonSummary,
} from '../../domain';
import { PokemonRemoteDataSource } from '../datasources';
import { toPokemonDetail, toPokemonPage, toPokemonSummary } from '../mappers';

// Implementación del repositorio de Pokémon sobre la fuente de datos remota.
export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(private readonly remoteDataSource: PokemonRemoteDataSource) {}

  // Obtiene la lista remota y la mapea a una página de dominio.
  async getPokemonPage(
    offset: number,
    limit: number,
  ): Promise<Page<PokemonSummary>> {
    const dto = await this.remoteDataSource.getPokemonList(offset, limit);
    return toPokemonPage(dto, offset);
  }

  // Obtiene la lista completa de especies y la mapea a resúmenes de dominio.
  async getAllPokemon(): Promise<PokemonSummary[]> {
    const dto = await this.remoteDataSource.getAllPokemon();
    return dto.results.map(toPokemonSummary);
  }

  // Pide Pokémon y especie en paralelo, luego la cadena, y arma el detalle.
  async getPokemonDetail(id: number): Promise<PokemonDetail> {
    const [pokemon, species] = await Promise.all([
      this.remoteDataSource.getPokemon(id),
      this.remoteDataSource.getPokemonSpecies(id),
    ]);
    const chain = await this.remoteDataSource.getEvolutionChain(
      species.evolution_chain.url,
    );
    return toPokemonDetail(pokemon, chain);
  }
}
