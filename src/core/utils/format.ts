import {
  POKEMON_NUMBER_PAD_CHAR,
  POKEMON_NUMBER_PAD_LENGTH,
  POKEMON_NUMBER_PREFIX,
} from '../config';

// Formatea el id como número de Pokédex con prefijo y ceros a la izquierda.
export const formatPokemonNumber = (id: number): string =>
  `${POKEMON_NUMBER_PREFIX}${String(id).padStart(
    POKEMON_NUMBER_PAD_LENGTH,
    POKEMON_NUMBER_PAD_CHAR,
  )}`;

// Devuelve el texto con la primera letra en mayúscula.
export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);
