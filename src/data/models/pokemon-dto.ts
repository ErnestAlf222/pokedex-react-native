import { NamedResourceDto } from './named-resource-dto';

export interface MoveVersionDetailDto {
  level_learned_at: number;
  move_learn_method: NamedResourceDto;
  version_group: NamedResourceDto;
}

export interface PokemonMoveDto {
  move: NamedResourceDto;
  version_group_details: MoveVersionDetailDto[];
}

export interface PokemonDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { type: NamedResourceDto }[];
  stats: { base_stat: number; stat: NamedResourceDto }[];
  abilities: { ability: NamedResourceDto; is_hidden: boolean }[];
  moves: PokemonMoveDto[];
  species: NamedResourceDto;
}
