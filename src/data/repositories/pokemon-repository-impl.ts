import {
  AbilityDetail,
  MoveDetail,
  Page,
  PokemonDetail,
  PokemonGenerationIndex,
  PokemonRepository,
  PokemonSummary,
  PokemonTypeIndex,
  TypeDamageRelations,
} from '../../domain';
import { PokemonRemoteDataSource } from '../datasources';
import {
  toAbilityDetail,
  toMoveDetail,
  toPokemonGenerationIndex,
  toPokemonDetail,
  toPokemonPage,
  toPokemonSummary,
  toPokemonTypeIndex,
  toTypeDamageRelations,
} from '../mappers';

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
    return toPokemonDetail(pokemon, species, chain);
  }

  // Pide especies y tipos en paralelo; las especies definen qué ids son válidos (sin formas alternativas).
  async getPokemonTypeIndex(): Promise<PokemonTypeIndex> {
    const [species, types] = await Promise.all([
      this.getAllPokemon(),
      this.remoteDataSource.getAllTypes(),
    ]);
    return toPokemonTypeIndex(types, new Set(species.map(({ id }) => id)));
  }

  // Pide las relaciones de daño de cada tipo y las mapea a entidades de dominio.
  async getTypeDamageRelations(
    typeNames: string[],
  ): Promise<TypeDamageRelations[]> {
    const dtos = await this.remoteDataSource.getTypeDamageRelations(typeNames);
    return dtos.map(toTypeDamageRelations);
  }

  // Pide todas las generaciones y arma el índice de generaciones.
  async getPokemonGenerationIndex(): Promise<PokemonGenerationIndex> {
    return toPokemonGenerationIndex(
      await this.remoteDataSource.getAllGenerations(),
    );
  }

  // Pide un movimiento por nombre y lo mapea a la entidad de dominio.
  async getMoveDetail(name: string): Promise<MoveDetail> {
    return toMoveDetail(await this.remoteDataSource.getMove(name));
  }

  // Pide una habilidad por nombre y la mapea a la entidad de dominio.
  async getAbilityDetail(name: string): Promise<AbilityDetail> {
    return toAbilityDetail(await this.remoteDataSource.getAbility(name));
  }
}
