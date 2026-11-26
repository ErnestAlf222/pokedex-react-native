import { NamedResourceDto } from './named-resource-dto';

export interface FlavorTextDto {
  flavor_text: string;
  language: NamedResourceDto;
}

export interface GenusDto {
  genus: string;
  language: NamedResourceDto;
}

export interface PokemonSpeciesDto {
  id: number;
  name: string;
  evolution_chain: { url: string };
  flavor_text_entries: FlavorTextDto[];
  genera: GenusDto[];
  capture_rate: number;
  gender_rate: number;
  egg_groups: NamedResourceDto[];
  habitat: NamedResourceDto | null;
  base_happiness: number;
  growth_rate: NamedResourceDto;
  is_legendary: boolean;
  is_mythical: boolean;
  is_baby: boolean;
}
