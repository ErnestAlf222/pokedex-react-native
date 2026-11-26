import { DECIMETERS_PER_METER, HECTOGRAMS_PER_KILOGRAM } from '../config';

// Convierte decímetros (unidad de PokéAPI) a metros.
export const decimetersToMeters = (decimeters: number): number =>
  decimeters / DECIMETERS_PER_METER;

// Convierte hectogramos (unidad de PokéAPI) a kilogramos.
export const hectogramsToKilograms = (hectograms: number): number =>
  hectograms / HECTOGRAMS_PER_KILOGRAM;
