import { AbilityDetail } from '../entities';
import { PokemonRepository } from '../repositories';

// Caso de uso que obtiene el detalle de una habilidad por nombre.
export class GetAbilityDetailUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide el detalle de la habilidad con el nombre indicado.
  execute(name: string): Promise<AbilityDetail> {
    return this.repository.getAbilityDetail(name);
  }
}
