import { EvolutionStage } from './evolution-stage';

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  shinyImageUrl: string;
  types: string[];
  stats: PokemonStat[];
  abilities: string[];
  height: number;
  weight: number;
  evolutions: EvolutionStage[];
}
