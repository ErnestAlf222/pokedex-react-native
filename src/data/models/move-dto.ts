import { LocalizedNameDto } from './localized-name-dto';
import { NamedResourceDto } from './named-resource-dto';
import { FlavorTextDto } from './pokemon-species-dto';

export interface MoveDto {
  name: string;
  type: NamedResourceDto;
  damage_class: NamedResourceDto;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  names: LocalizedNameDto[];
  flavor_text_entries: FlavorTextDto[];
}
