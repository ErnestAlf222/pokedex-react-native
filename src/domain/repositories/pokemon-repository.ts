import { Page, PokemonSummary } from '../entities';

export interface PokemonRepository {
  getPokemonPage(offset: number, limit: number): Promise<Page<PokemonSummary>>;
}
