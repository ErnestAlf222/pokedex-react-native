import { POKEMON_ID_PLACEHOLDER, POKEMON_IMAGE_URL_TEMPLATE } from '../src/core';
import { toEvolutionStages } from '../src/data';
import { bulbasaurChainDto, eeveeChainDto } from '../__fixtures__/pokemon-data';

// Arma la etapa esperada con la imagen de la plantilla de config.
const stage = (id: number, name: string) => ({
  id,
  name,
  imageUrl: POKEMON_IMAGE_URL_TEMPLATE.replace(
    POKEMON_ID_PLACEHOLDER,
    String(id),
  ),
});

// Pruebas del mapper de cadena evolutiva con datos reales de PokéAPI.
describe('toEvolutionStages', () => {
  it('aplana una cadena lineal en orden de etapa (Bulbasaur)', () => {
    expect(toEvolutionStages(bulbasaurChainDto)).toEqual([
      stage(1, 'bulbasaur'),
      stage(2, 'ivysaur'),
      stage(3, 'venusaur'),
    ]);
  });

  it('soporta ramificaciones: Eevee seguido de sus 8 evoluciones', () => {
    expect(toEvolutionStages(eeveeChainDto)).toEqual([
      stage(133, 'eevee'),
      stage(134, 'vaporeon'),
      stage(135, 'jolteon'),
      stage(136, 'flareon'),
      stage(196, 'espeon'),
      stage(197, 'umbreon'),
      stage(470, 'leafeon'),
      stage(471, 'glaceon'),
      stage(700, 'sylveon'),
    ]);
  });
});
