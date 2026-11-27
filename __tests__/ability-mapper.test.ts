import { AbilityDto, toAbilityDetail } from '../src/data';
import { overgrowDto } from '../__fixtures__/move-ability-data';

// Quita las entradas en español de una habilidad para simular una traducción faltante.
const withoutSpanish = (dto: AbilityDto): AbilityDto => ({
  ...dto,
  names: dto.names.filter(({ language }) => language.name !== 'es'),
  flavor_text_entries: dto.flavor_text_entries.filter(
    ({ language }) => language.name !== 'es',
  ),
});

// Pruebas del mapper de habilidades con datos reales de Overgrow.
describe('toAbilityDetail', () => {
  it('mapea nombre y descripción en español', () => {
    expect(toAbilityDetail(overgrowDto)).toEqual({
      name: 'Espesura',
      description:
        'Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.',
    });
  });

  it('cae al inglés si faltan el nombre y la descripción en español', () => {
    expect(toAbilityDetail(withoutSpanish(overgrowDto))).toEqual({
      name: 'Overgrow',
      description: 'Powers up Grass-type moves when the Pokémon’s HP is low.',
    });
  });

  it('usa el slug legible como nombre y deja la descripción vacía si no hay textos', () => {
    expect(
      toAbilityDetail({
        name: 'solar-power',
        names: [],
        flavor_text_entries: [],
      }),
    ).toEqual({ name: 'Solar Power', description: '' });
  });
});
