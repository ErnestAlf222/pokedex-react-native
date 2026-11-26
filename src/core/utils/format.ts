import {
  POKEMON_NUMBER_PAD_CHAR,
  POKEMON_NUMBER_PAD_LENGTH,
  POKEMON_NUMBER_PREFIX,
  SLUG_SEPARATOR,
  WORD_SEPARATOR,
} from '../config';

// Formatea el id como número de Pokédex con prefijo y ceros a la izquierda.
export const formatPokemonNumber = (id: number): string =>
  `${POKEMON_NUMBER_PREFIX}${String(id).padStart(
    POKEMON_NUMBER_PAD_LENGTH,
    POKEMON_NUMBER_PAD_CHAR,
  )}`;

// Devuelve la palabra con la primera letra en mayúscula.
const capitalizeWord = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

// Convierte un slug de la API (solar-power) en texto legible (Solar Power).
export const formatSlug = (slug: string): string =>
  slug.split(SLUG_SEPARATOR).map(capitalizeWord).join(WORD_SEPARATOR);
