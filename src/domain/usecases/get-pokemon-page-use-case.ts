import { POKEMON_PAGE_SIZE } from '../../core';
import { Page, PokemonSummary } from '../entities';
import { PokemonRepository } from '../repositories';

// Caso de uso que obtiene una página de Pokémon desde el repositorio.
export class GetPokemonPageUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide la página a partir del offset, con el tamaño de página por defecto.
  execute(
    offset: number,
    limit: number = POKEMON_PAGE_SIZE,
  ): Promise<Page<PokemonSummary>> {
    return this.repository.getPokemonPage(offset, limit);
  }
}
