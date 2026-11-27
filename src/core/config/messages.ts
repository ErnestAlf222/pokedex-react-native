import { DetailTab } from './ui';

export const UI_MESSAGES = {
  listTitle: 'Pokédex',
  retry: 'Reintentar',
  empty: 'No se encontraron Pokémon',
  back: 'Volver',
  height: 'Altura',
  weight: 'Peso',
  abilities: 'Habilidades',
  noEvolutions: 'Este Pokémon no tiene evoluciones',
  searchPlaceholder: 'Buscar por nombre o número',
  clearSearch: 'Limpiar búsqueda',
  offline: 'Sin conexión',
  backOnline: 'Conexión restablecida',
  allTypes: 'Todos',
  captureRate: 'Ratio de captura',
  gender: 'Género',
  female: 'Hembra',
  male: 'Macho',
  noGender: 'Sin género',
  eggGroups: 'Grupos huevo',
  habitat: 'Hábitat',
  baseHappiness: 'Felicidad base',
  growthRate: 'Tasa de crecimiento',
  baseExperience: 'Experiencia base',
  legendary: 'Legendario',
  mythical: 'Mítico',
  baby: 'Bebé',
  weaknesses: 'Debilidades',
  effectivenessUnavailable: 'Debilidades no disponibles sin conexión',
  total: 'Total',
  noMoves: 'Sin movimientos por nivel',
  level: 'Nivel',
  learnedOnEvolution: 'Evo.',
  viewMore: 'Ver más',
  hiddenAbility: 'Oculta',
  power: 'Poder',
  accuracy: 'Precisión',
  pp: 'PP',
  noValue: '—',
  filters: 'Filtros',
  closeFilters: 'Cerrar filtros',
  generation: 'Generación',
  allGenerations: 'Todas',
  generationsUnavailable: 'Generaciones no disponibles sin conexión',
  order: 'Orden',
  clearFilters: 'Limpiar',
  applyFilters: 'Aplicar',
} as const;

export const DETAIL_TAB_LABELS: Record<DetailTab, string> = {
  about: 'Acerca de',
  stats: 'Estadísticas',
  evolutions: 'Evoluciones',
  moves: 'Movimientos',
};

// Etiqueta del multiplicador de daño por su valor numérico.
export const MULTIPLIER_LABELS: Record<number, string> = {
  4: '×4',
  2: '×2',
  0.5: '×½',
  0.25: '×¼',
};

// Mensaje sin coincidencias, incluyendo el texto buscado y el tipo elegido si los hay.
export const noResultsMessage = (
  query: string,
  type: string,
  generation = '',
): string => {
  const criteria = [query && `"${query}"`, type && `tipo ${type}`, generation]
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
  percent: '%',
} as const;

export const ERROR_MESSAGES = {
  offline: 'Sin conexión. Conéctate a internet para cargar los datos.',
  network: 'No hay conexión de red',
  http: 'El servidor respondió con un error',
  unknown: 'Ocurrió un error inesperado',
} as const;
