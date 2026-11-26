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
  allTypes: 'Todos',
} as const;

// Mensaje sin coincidencias, incluyendo el texto buscado y el tipo elegido si los hay.
export const noResultsMessage = (query: string, type: string): string => {
  const criteria = [query && `"${query}"`, type && `tipo ${type}`]
    .filter(Boolean)
    .join(' · ');
  return criteria === '' ? UI_MESSAGES.empty : `Sin resultados para ${criteria}`;
};

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
