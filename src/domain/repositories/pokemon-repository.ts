import {
  AbilityDetail,
  MoveDetail,
  Page,
  PokemonDetail,
  PokemonSummary,
  PokemonTypeIndex,
  TypeDamageRelations,
} from '../entities';

export interface PokemonRepository {
  getPokemonPage(offset: number, limit: number): Promise<Page<PokemonSummary>>;
  getAllPokemon(): Promise<PokemonSummary[]>;
  getPokemonDetail(id: number): Promise<PokemonDetail>;
  getPokemonTypeIndex(): Promise<PokemonTypeIndex>;
  getTypeDamageRelations(typeNames: string[]): Promise<TypeDamageRelations[]>;
  getMoveDetail(name: string): Promise<MoveDetail>;
  getAbilityDetail(name: string): Promise<AbilityDetail>;
}
