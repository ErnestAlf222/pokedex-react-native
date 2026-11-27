export interface PokemonGeneration {
  id: number;
  name: string;
  region: string;
}

// Índice de generaciones: la lista de generaciones y, por id de especie, la generación a la que pertenece.
export interface PokemonGenerationIndex {
  generations: PokemonGeneration[];
  bySpecies: Record<number, number>;
}
