import { POKEMON_ID_PLACEHOLDER, POKEMON_IMAGE_URL_TEMPLATE } from '../../core';
import { Page, PokemonSummary } from '../../domain';
import { NamedResourceDto, PokemonListDto } from '../models';

// Extrae el id numérico del final de la URL de un recurso de PokéAPI.
const extractId = (url: string): number =>
  Number(url.split('/').filter(Boolean).pop());

// Arma la URL de una imagen a partir del id, con la plantilla oficial por defecto.
export const buildImageUrl = (
  id: number,
  template: string = POKEMON_IMAGE_URL_TEMPLATE,
): string => template.replace(POKEMON_ID_PLACEHOLDER, String(id));

// Convierte un recurso con nombre y URL en un PokemonSummary con su imagen.
export const toPokemonSummary = ({
  name,
  url,
}: NamedResourceDto): PokemonSummary => {
  const id = extractId(url);
  return { id, name, imageUrl: buildImageUrl(id) };
};

// Convierte el DTO de lista en una página de dominio con el siguiente offset.
export const toPokemonPage = (
  { results, next }: PokemonListDto,
  offset: number,
): Page<PokemonSummary> => ({
  items: results.map(toPokemonSummary),
  nextOffset: next ? offset + results.length : null,
});
