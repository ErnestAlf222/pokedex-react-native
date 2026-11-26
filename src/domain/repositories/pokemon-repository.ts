import { Page, PokemonDetail, PokemonSummary } from '../entities';

export interface PokemonRepository {
  getPokemonPage(offset: number, limit: number): Promise<Page<PokemonSummary>>;
  getAllPokemon(): Promise<PokemonSummary[]>;
  getPokemonDetail(id: number): Promise<PokemonDetail>;
}
