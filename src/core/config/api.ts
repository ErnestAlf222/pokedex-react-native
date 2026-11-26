import { POKEAPI_SPRITES_BASE_URL } from './env';

export const POKEMON_ENDPOINT = '/pokemon';
export const POKEMON_SPECIES_ENDPOINT = '/pokemon-species';
export const POKEMON_PAGE_SIZE = 20;
export const POKEMON_QUERY_PARAMS = { offset: 'offset', limit: 'limit' } as const;

export const POKEMON_ID_PLACEHOLDER = '{id}';
export const POKEMON_IMAGE_URL_TEMPLATE = `${POKEAPI_SPRITES_BASE_URL}/pokemon/other/official-artwork/${POKEMON_ID_PLACEHOLDER}.png`;
