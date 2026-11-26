import {
  POKEMON_ID_PLACEHOLDER,
  POKEMON_IMAGE_URL_TEMPLATE,
  POKEMON_SHINY_IMAGE_URL_TEMPLATE,
} from '../src/core';
import { toPokemonDetail } from '../src/data';
import { bulbasaurChainDto, bulbasaurDto } from '../__fixtures__/pokemon-data';

// Pruebas del mapper de detalle con los datos reales de Bulbasaur.
describe('toPokemonDetail', () => {
  const detail = toPokemonDetail(bulbasaurDto, bulbasaurChainDto);

  it('mapea los datos básicos y las imágenes desde las plantillas de config', () => {
    expect(detail).toMatchObject({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      imageUrl: POKEMON_IMAGE_URL_TEMPLATE.replace(
        POKEMON_ID_PLACEHOLDER,
        '1',
      ),
      shinyImageUrl: POKEMON_SHINY_IMAGE_URL_TEMPLATE.replace(
        POKEMON_ID_PLACEHOLDER,
        '1',
      ),
    });
  });

  it('usa el nombre de la especie y no el de la forma (Deoxys)', () => {
    const deoxys = toPokemonDetail(
      {
        ...bulbasaurDto,
        id: 386,
        name: 'deoxys-normal',
        species: {
          name: 'deoxys',
          url: 'https://pokeapi.co/api/v2/pokemon-species/386/',
        },
      },
      bulbasaurChainDto,
    );

    expect(deoxys.name).toBe('deoxys');
  });

  it('mapea los tipos y las habilidades', () => {
    expect(detail.types).toEqual(['grass', 'poison']);
    expect(detail.abilities).toEqual(['overgrow', 'chlorophyll']);
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
