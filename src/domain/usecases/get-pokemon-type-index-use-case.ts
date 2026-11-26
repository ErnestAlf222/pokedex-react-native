import { PokemonTypeIndex } from '../entities';
import { PokemonRepository } from '../repositories';

// Caso de uso que obtiene el índice de tipos de todas las especies.
export class GetPokemonTypeIndexUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide el índice de tipos al repositorio.
  execute(): Promise<PokemonTypeIndex> {
    return this.repository.getPokemonTypeIndex();
  }
}
