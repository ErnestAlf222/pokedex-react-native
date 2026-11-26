import { TypeDamageRelations } from '../../domain';
import { NamedResourceDto, TypeDamageRelationsDto } from '../models';

// Extrae los nombres de una lista de recursos.
const toNames = (resources: NamedResourceDto[]): string[] =>
  resources.map(({ name }) => name);

// Convierte las relaciones de daño de PokéAPI en la entidad de dominio.
export const toTypeDamageRelations = ({
  damage_relations,
}: TypeDamageRelationsDto): TypeDamageRelations => ({
  doubleDamageFrom: toNames(damage_relations.double_damage_from),
  halfDamageFrom: toNames(damage_relations.half_damage_from),
  noDamageFrom: toNames(damage_relations.no_damage_from),
});
