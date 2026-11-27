import { LocalizedNameDto } from './localized-name-dto';
import { FlavorTextDto } from './pokemon-species-dto';

export interface AbilityDto {
  name: string;
  names: LocalizedNameDto[];
  flavor_text_entries: FlavorTextDto[];
}
