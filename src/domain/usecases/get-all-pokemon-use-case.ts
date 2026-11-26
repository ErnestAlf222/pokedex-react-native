import { PokemonSummary } from '../entities';
import { PokemonRepository } from '../repositories';

// Caso de uso que obtiene la lista completa de Pokémon (solo id, nombre e imagen).
export class GetAllPokemonUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide la lista completa al repositorio.
  execute(): Promise<PokemonSummary[]> {
    return this.repository.getAllPokemon();
  }
}
