import { TypeEffectiveness } from '../entities';
import { PokemonRepository } from '../repositories';
import { calculateTypeEffectiveness } from '../services';

// Caso de uso que calcula debilidades, resistencias e inmunidades de una combinación de tipos.
export class GetTypeEffectivenessUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  // Pide las relaciones de daño de cada tipo y las combina.
  async execute(typeNames: string[]): Promise<TypeEffectiveness> {
    const relations = await this.repository.getTypeDamageRelations(typeNames);
    return calculateTypeEffectiveness(relations);
  }
}
