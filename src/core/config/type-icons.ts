// Los 18 tipos de Pokémon, en el orden de la Pokédex; las claves son los nombres que devuelve PokéAPI.
export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;
export type PokemonTypeName = (typeof POKEMON_TYPES)[number];

// Ícono de Material Icons por tipo.
export const TYPE_ICONS = {
  normal: 'circle',
  fire: 'local-fire-department',
  water: 'water-drop',
  electric: 'bolt',
  grass: 'eco',
  ice: 'ac-unit',
  fighting: 'sports-mma',
  poison: 'science',
  ground: 'terrain',
  flying: 'air',
  psychic: 'psychology',
  bug: 'bug-report',
  rock: 'diamond',
  ghost: 'blur-on',
  dragon: 'castle',
  dark: 'dark-mode',
  steel: 'settings',
  fairy: 'stars',
} as const satisfies Record<PokemonTypeName, string>;
export type TypeIconName = (typeof TYPE_ICONS)[PokemonTypeName];

export const FALLBACK_TYPE_ICON: TypeIconName = 'circle';

// Ícono de Material Icons por clase de daño de un movimiento.
export const DAMAGE_CLASS_ICONS = {
  physical: 'front-hand',
  special: 'auto-fix-high',
  status: 'swap-vert',
} as const;
export type DamageClassName = keyof typeof DAMAGE_CLASS_ICONS;
export type DamageClassIconName =
  (typeof DAMAGE_CLASS_ICONS)[DamageClassName];

export const FALLBACK_DAMAGE_CLASS_ICON: DamageClassIconName = 'swap-vert';
