import { POKEMON_ID_PLACEHOLDER, POKEMON_IMAGE_URL_TEMPLATE } from '../src/core';
import { toPokemonDetail } from '../src/data';
import { bulbasaurChainDto, bulbasaurDto } from '../__fixtures__/pokemon-data';

// Pruebas del mapper de detalle con los datos reales de Bulbasaur.
describe('toPokemonDetail', () => {
  const detail = toPokemonDetail(bulbasaurDto, bulbasaurChainDto);

  it('mapea los datos básicos y la imagen desde la plantilla de config', () => {
    expect(detail).toMatchObject({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      imageUrl: POKEMON_IMAGE_URL_TEMPLATE.replace(
        POKEMON_ID_PLACEHOLDER,
        '1',
      ),
    });
  });

  it('mapea tipos, habilidades y sprites de frente y de espalda', () => {
    expect(detail.types).toEqual(['grass', 'poison']);
    expect(detail.abilities).toEqual(['overgrow', 'chlorophyll']);
    expect(detail.spriteFront).toBe(bulbasaurDto.sprites.front_default);
    expect(detail.spriteBack).toBe(bulbasaurDto.sprites.back_default);
  });

  it('mapea los stats con su nombre y valor base', () => {
    expect(detail.stats).toEqual([
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
      { name: 'defense', value: 49 },
      { name: 'special-attack', value: 65 },
      { name: 'special-defense', value: 65 },
      { name: 'speed', value: 45 },
    ]);
  });

  it('incluye las evoluciones aplanadas por etapa', () => {
    expect(detail.evolutions.map(({ name }) => name)).toEqual([
      'bulbasaur',
      'ivysaur',
      'venusaur',
    ]);
  });
});
