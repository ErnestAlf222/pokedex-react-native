import { LocalizedNameDto } from './localized-name-dto';
import { NamedResourceDto } from './named-resource-dto';

export interface GenerationDto {
  id: number;
  name: string;
  main_region: NamedResourceDto;
  names: LocalizedNameDto[];
  pokemon_species: NamedResourceDto[];
}
