import { NamedResourceDto } from './named-resource-dto';

export interface DamageRelationsDto {
  double_damage_from: NamedResourceDto[];
  half_damage_from: NamedResourceDto[];
  no_damage_from: NamedResourceDto[];
}

export interface TypeDamageRelationsDto {
  name: string;
  damage_relations: DamageRelationsDto;
}
