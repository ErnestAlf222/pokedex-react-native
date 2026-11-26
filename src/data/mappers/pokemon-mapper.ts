import { POKEMON_ID_PLACEHOLDER, POKEMON_IMAGE_URL_TEMPLATE } from '../../core';
import { Page, PokemonSummary } from '../../domain';
import { PokemonListDto, PokemonListItemDto } from '../models';

const extractId = (url: string): number =>
  Number(url.split('/').filter(Boolean).pop());

export const toPokemonSummary = ({
  name,
  url,
}: PokemonListItemDto): PokemonSummary => {
  const id = extractId(url);
  return {
    id,
    name,
    imageUrl: POKEMON_IMAGE_URL_TEMPLATE.replace(
      POKEMON_ID_PLACEHOLDER,
      String(id),
    ),
  };
};

export const toPokemonPage = (
  { results, next }: PokemonListDto,
  offset: number,
): Page<PokemonSummary> => ({
  items: results.map(toPokemonSummary),
  nextOffset: next ? offset + results.length : null,
});
