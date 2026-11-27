import {
  EVOLUTION_LEARN_LEVEL,
  LabelMap,
  MULTIPLIER_LABELS,
  TYPE_LABELS,
  UI_MESSAGES,
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

// Formatea un multiplicador de daño (2 → ×2, 0.25 → ×¼); si no tiene etiqueta usa el número.
export const formatMultiplier = (multiplier: number): string =>
  MULTIPLIER_LABELS[multiplier] ?? `×${multiplier}`;

// Devuelve la etiqueta de la clave en el mapa; si falta, cae al texto legible del slug.
export const getLabel = (labels: LabelMap, key: string): string =>
  labels[key] ?? formatSlug(key);

// Texto del nivel de un movimiento: "Nivel N", o "Evo." si se aprende al evolucionar (nivel 0).
export const formatMoveLevel = (level: number): string =>
  level === EVOLUTION_LEARN_LEVEL
    ? UI_MESSAGES.learnedOnEvolution
    : `${UI_MESSAGES.level} ${level}`;

// Texto del nivel dentro de un círculo: el número, o "Evo." si se aprende al evolucionar (nivel 0).
export const formatLevelBadge = (level: number): string =>
  level === EVOLUTION_LEARN_LEVEL
    ? UI_MESSAGES.learnedOnEvolution
    : String(level);

// Texto de poder, precisión o PP de un movimiento: el valor con su sufijo, o "—" si la API no lo da (null).
export const formatMoveStat = (value: number | null, suffix = ''): string =>
  value === null ? UI_MESSAGES.noValue : `${value}${suffix}`;

// Etiqueta en español de un tipo de Pokémon.
export const getTypeLabel = (type: string): string =>
  getLabel(TYPE_LABELS, type);
