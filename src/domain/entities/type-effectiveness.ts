export interface TypeMultiplier {
  type: string;
  multiplier: number;
}

export interface TypeEffectiveness {
  weaknesses: TypeMultiplier[];
  resistances: TypeMultiplier[];
  immunities: TypeMultiplier[];
}
