import { Page, PokemonDetail, PokemonSummary } from '../entities';

export interface PokemonRepository {
  getPokemonPage(offset: number, limit: number): Promise<Page<PokemonSummary>>;
  getPokemonDetail(id: number): Promise<PokemonDetail>;
}
