import { MoveDetail } from '../entities';
import { PokemonRepository } from '../repositories';

// Caso de uso que obtiene el detalle de un movimiento por nombre.
export class GetMoveDetailUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide el detalle del movimiento con el nombre indicado.
  execute(name: string): Promise<MoveDetail> {
    return this.repository.getMoveDetail(name);
  }
}
