export const LEVEL_UP_LEARN_METHOD = 'level-up';
export const MAX_DETAIL_MOVES = 10;

// Grupos de versiones por fecha de lanzamiento (del más antiguo al más reciente); el orden de la API no es cronológico.
export const MOVE_VERSION_GROUPS = [
  'red-green-japan',
  'blue-japan',
  'red-blue',
  'yellow',
  'gold-silver',
  'crystal',
  'ruby-sapphire',
  'colosseum',
  'firered-leafgreen',
  'emerald',
  'xd',
  'diamond-pearl',
  'platinum',
  'heartgold-soulsilver',
  'black-white',
  'black-2-white-2',
  'x-y',
  'omega-ruby-alpha-sapphire',
  'sun-moon',
  'ultra-sun-ultra-moon',
  'lets-go-pikachu-lets-go-eevee',
  'sword-shield',
  'brilliant-diamond-shining-pearl',
  'legends-arceus',
  'scarlet-violet',
  'legends-za',
] as const;

export const GENDERLESS_RATE = -1;
export const GENDER_RATE_STEPS = 8;

export const DAMAGE_MULTIPLIERS = {
  weak: 2,
  neutral: 1,
  resistant: 0.5,
  immune: 0,
} as const;
