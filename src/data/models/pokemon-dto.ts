import { NamedResourceDto } from './named-resource-dto';

export interface PokemonDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: NamedResourceDto }[];
  stats: { base_stat: number; stat: NamedResourceDto }[];
  abilities: { ability: NamedResourceDto }[];
  sprites: { front_default: string | null; back_default: string | null };
  species: NamedResourceDto;
}
