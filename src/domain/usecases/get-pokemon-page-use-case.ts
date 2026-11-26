import { POKEMON_PAGE_SIZE } from '../../core';
import { Page, PokemonSummary } from '../entities';
import { PokemonRepository } from '../repositories';

export class GetPokemonPageUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  execute(
    offset: number,
    limit: number = POKEMON_PAGE_SIZE,
  ): Promise<Page<PokemonSummary>> {
    return this.repository.getPokemonPage(offset, limit);
  }
}
