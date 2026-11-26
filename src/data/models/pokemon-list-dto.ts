import { NamedResourceDto } from './named-resource-dto';

export type PokemonListItemDto = NamedResourceDto;

export interface PokemonListDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemDto[];
}
