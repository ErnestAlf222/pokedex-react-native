const MS_PER_MINUTE = 60 * 1000;

export const QUERY_STALE_TIME_MS = 5 * MS_PER_MINUTE;
export const QUERY_RETRY_COUNT = 1;
export const INITIAL_OFFSET = 0;
export const POKEMON_DETAIL_STALE_TIME_MS = 30 * MS_PER_MINUTE;

export const POKEMON_QUERY_KEYS = {
  list: ['pokemon', 'list'],
  detail: (id: number) => ['pokemon', 'detail', id],
} as const;
