export const UI_MESSAGES = {
  listTitle: 'Pokédex',
  retry: 'Reintentar',
  empty: 'No se encontraron Pokémon',
  back: 'Volver',
  height: 'Altura',
  weight: 'Peso',
  abilities: 'Habilidades',
  stats: 'Estadísticas',
  evolutions: 'Evoluciones',
  noEvolutions: 'Este Pokémon no tiene evoluciones',
  searchPlaceholder: 'Buscar por nombre o número',
  clearSearch: 'Limpiar búsqueda',
  offline: 'Sin conexión',
  backOnline: 'Conexión restablecida',
} as const;

// Mensaje de búsqueda sin coincidencias, incluyendo lo que se buscó.
export const noResultsMessage = (query: string): string =>
  `Sin resultados para "${query}"`;

// Etiqueta por stat; la clave es el nombre del stat que devuelve PokéAPI.
export const STAT_LABELS: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. especial',
  'special-defense': 'Def. especial',
  speed: 'Velocidad',
};

export const UNIT_LABELS = {
  meter: 'm',
  kilogram: 'kg',
} as const;

export const ERROR_MESSAGES = {
  offline: 'Sin conexión. Conéctate a internet para cargar los datos.',
  network: 'No hay conexión de red',
  http: 'El servidor respondió con un error',
  unknown: 'Ocurrió un error inesperado',
} as const;
