import { Page, PokemonRepository, PokemonSummary } from '../../domain';
import { PokemonRemoteDataSource } from '../datasources';
import { toPokemonPage } from '../mappers';

export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(private readonly remoteDataSource: PokemonRemoteDataSource) {}

  async getPokemonPage(
    offset: number,
    limit: number,
  ): Promise<Page<PokemonSummary>> {
    const dto = await this.remoteDataSource.getPokemonList(offset, limit);
    return toPokemonPage(dto, offset);
  }
}
