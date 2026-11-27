import { PokemonGenerationIndex } from '../entities';
import { PokemonRepository } from '../repositories';

// Caso de uso que obtiene el índice de generaciones de todas las especies.
export class GetPokemonGenerationIndexUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide el índice de generaciones al repositorio.
  execute(): Promise<PokemonGenerationIndex> {
    return this.repository.getPokemonGenerationIndex();
  }
}
