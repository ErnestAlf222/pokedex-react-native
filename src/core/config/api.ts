import { POKEAPI_SPRITES_BASE_URL } from './env';

export const POKEMON_ENDPOINT = '/pokemon';
export const POKEMON_SPECIES_ENDPOINT = '/pokemon-species';
export const TYPE_ENDPOINT = '/type';
export const GENERATION_ENDPOINT = '/generation';
export const MOVE_ENDPOINT = '/move';
export const ABILITY_ENDPOINT = '/ability';
export const POKEMON_PAGE_SIZE = 20;
export const POKEMON_FULL_LIST_LIMIT = 2000;
export const POKEMON_QUERY_PARAMS = { offset: 'offset', limit: 'limit' } as const;

export const POKEMON_ID_PLACEHOLDER = '{id}';
const OFFICIAL_ARTWORK_URL = `${POKEAPI_SPRITES_BASE_URL}/pokemon/other/official-artwork`;
export const POKEMON_IMAGE_URL_TEMPLATE = `${OFFICIAL_ARTWORK_URL}/${POKEMON_ID_PLACEHOLDER}.png`;
export const POKEMON_SHINY_IMAGE_URL_TEMPLATE = `${OFFICIAL_ARTWORK_URL}/shiny/${POKEMON_ID_PLACEHOLDER}.png`;
