import { PokemonDetail } from '../entities';
import { PokemonRepository } from '../repositories';

// Caso de uso que obtiene el detalle completo de un Pokémon.
export class GetPokemonDetailUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide el detalle del Pokémon con el id indicado.
  execute(id: number): Promise<PokemonDetail> {
    return this.repository.getPokemonDetail(id);
  }
}
