import { POKEMON_IMAGE_URL_TEMPLATE, POKEMON_ID_PLACEHOLDER } from '../src/core';
import { PokemonListDto, toPokemonPage } from '../src/data';

const responseWithNext: PokemonListDto = {
  count: 1025,
  next: 'https://pokeapi.co/api/v2/pokemon-species?offset=2&limit=2',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
  ],
};

// Arma la URL de imagen esperada a partir de la plantilla de config.
const imageUrl = (id: number): string =>
  POKEMON_IMAGE_URL_TEMPLATE.replace(POKEMON_ID_PLACEHOLDER, String(id));

// Pruebas del mapper puro con datos de la respuesta real de PokéAPI.
describe('toPokemonPage', () => {
  it('mapea id, nombre e imagen desde la URL de cada resultado', () => {
    expect(toPokemonPage(responseWithNext, 0).items).toEqual([
      { id: 1, name: 'bulbasaur', imageUrl: imageUrl(1) },
      { id: 2, name: 'ivysaur', imageUrl: imageUrl(2) },
    ]);
  });

  it('calcula el siguiente offset cuando hay más páginas', () => {
    expect(toPokemonPage(responseWithNext, 0).nextOffset).toBe(2);
  });

  it('devuelve nextOffset null en la última página', () => {
    expect(
      toPokemonPage({ ...responseWithNext, next: null }, 1023).nextOffset,
    ).toBeNull();
  });
});
