import { EvolutionStage } from './evolution-stage';

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonMove {
  name: string;
  level: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonGender {
  female: number;
  male: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  shinyImageUrl: string;
  types: string[];
  stats: PokemonStat[];
  statsTotal: number;
  abilities: PokemonAbility[];
  height: number;
  weight: number;
  description: string;
  category: string;
  captureRate: number;
  gender: PokemonGender | null;
  eggGroups: string[];
  habitat: string | null;
  baseHappiness: number;
  growthRate: string;
  baseExperience: number;
  isLegendary: boolean;
  isMythical: boolean;
  isBaby: boolean;
  moves: PokemonMove[];
  evolutions: EvolutionStage[];
}
