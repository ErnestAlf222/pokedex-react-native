const MS_PER_MINUTE = 60 * 1000;

export const QUERY_STALE_TIME_MS = 5 * MS_PER_MINUTE;
export const QUERY_RETRY_COUNT = 1;
export const INITIAL_OFFSET = 0;
export const POKEMON_DETAIL_STALE_TIME_MS = 30 * MS_PER_MINUTE;
export const ALL_POKEMON_STALE_TIME_MS = Infinity;
export const ALL_POKEMON_GC_TIME_MS = Infinity;
export const TYPE_INDEX_STALE_TIME_MS = Infinity;
export const TYPE_INDEX_GC_TIME_MS = Infinity;
export const EFFECTIVENESS_STALE_TIME_MS = Infinity;
export const EFFECTIVENESS_GC_TIME_MS = Infinity;
export const CATALOG_STALE_TIME_MS = Infinity;
export const CATALOG_GC_TIME_MS = Infinity;

export const POKEMON_QUERY_KEYS = {
  list: ['pokemon', 'list'],
  all: ['pokemon', 'all'],
  typeIndex: ['pokemon', 'type-index'],
  detail: (id: number) => ['pokemon', 'detail', id],
  effectiveness: (typeNames: string[]) => [
    'pokemon',
    'effectiveness',
    ...[...typeNames].sort(),
  ],
  generationIndex: ['pokemon', 'generation-index'],
  move: (name: string) => ['pokemon', 'move', name],
  ability: (name: string) => ['pokemon', 'ability', name],
} as const;
