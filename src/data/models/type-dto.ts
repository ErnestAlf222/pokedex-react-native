import { NamedResourceDto } from './named-resource-dto';

export interface TypePokemonDto {
  slot: number;
  pokemon: NamedResourceDto;
}

export interface TypeDto {
  id: number;
  name: string;
  pokemon: TypePokemonDto[];
}
