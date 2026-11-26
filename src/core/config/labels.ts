export type LabelMap = Record<string, string>;

export const TYPE_LABELS: LabelMap = {
  normal: 'Normal',
  fighting: 'Lucha',
  flying: 'Volador',
  poison: 'Veneno',
  ground: 'Tierra',
  rock: 'Roca',
  bug: 'Bicho',
  ghost: 'Fantasma',
  steel: 'Acero',
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
  electric: 'Eléctrico',
  psychic: 'Psíquico',
  ice: 'Hielo',
  dragon: 'Dragón',
  dark: 'Siniestro',
  fairy: 'Hada',
  stellar: 'Astral',
  unknown: 'Desconocido',
  shadow: 'Sombra',
};

export const EGG_GROUP_LABELS: LabelMap = {
  monster: 'Monstruo',
  water1: 'Agua 1',
  bug: 'Bicho',
  flying: 'Volador',
  ground: 'Campo',
  fairy: 'Hada',
  plant: 'Planta',
  humanshape: 'Humanoide',
  water3: 'Agua 3',
  mineral: 'Mineral',
  indeterminate: 'Amorfo',
  water2: 'Agua 2',
  ditto: 'Ditto',
  dragon: 'Dragón',
  'no-eggs': 'Sin huevos',
};

export const HABITAT_LABELS: LabelMap = {
  cave: 'Cueva',
  forest: 'Bosque',
  grassland: 'Pradera',
  mountain: 'Montaña',
  rare: 'Raro',
  'rough-terrain': 'Terreno accidentado',
  sea: 'Mar',
  urban: 'Urbano',
  'waters-edge': 'Orilla del agua',
};

export const GROWTH_RATE_LABELS: LabelMap = {
  slow: 'Lenta',
  medium: 'Media',
  fast: 'Rápida',
  'medium-slow': 'Media lenta',
  'slow-then-very-fast': 'Errática',
  'fast-then-very-slow': 'Fluctuante',
};
