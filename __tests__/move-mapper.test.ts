import { MoveDto, toMoveDetail } from '../src/data';
import {
  growlDto,
  hurricaneDto,
  tackleDto,
} from '../__fixtures__/move-ability-data';

// Quita las entradas en español de un movimiento para simular una traducción faltante.
const withoutSpanish = (dto: MoveDto): MoveDto => ({
  ...dto,
  names: dto.names.filter(({ language }) => language.name !== 'es'),
  flavor_text_entries: dto.flavor_text_entries.filter(
    ({ language }) => language.name !== 'es',
  ),
});

// Pruebas del mapper de movimientos con datos reales de Tackle, Growl y Hurricane.
describe('toMoveDetail', () => {
  it('mapea Tackle (físico) con nombre y descripción en español', () => {
    expect(toMoveDetail(tackleDto)).toEqual({
      name: 'Placaje',
      type: 'normal',
      damageClass: 'physical',
      power: 40,
      accuracy: 100,
      pp: 35,
      description: 'Embestida con todo el cuerpo.',
    });
  });

  it('deja el poder en null en un movimiento de estado (Growl)', () => {
    expect(toMoveDetail(growlDto)).toMatchObject({
      name: 'Gruñido',
      damageClass: 'status',
      power: null,
      accuracy: 100,
      pp: 40,
      description:
        'Dulce gruñido que distrae al objetivo para que baje la guardia y reduce su Ataque durante un breve período de tiempo.',
    });
  });

  it('mapea Hurricane (especial) con todas sus cifras', () => {
    expect(toMoveDetail(hurricaneDto)).toMatchObject({
      name: 'Vendaval',
      type: 'flying',
      damageClass: 'special',
      power: 110,
      accuracy: 70,
      pp: 10,
    });
  });

  it('conserva la precisión y los PP en null cuando la API no los da', () => {
    expect(
      toMoveDetail({ ...tackleDto, accuracy: null, pp: null }),
    ).toMatchObject({ accuracy: null, pp: null });
  });

  it('cae al inglés si faltan el nombre y la descripción en español', () => {
    expect(toMoveDetail(withoutSpanish(tackleDto))).toMatchObject({
      name: 'Tackle',
      description:
        'The user attacks by charging forward and slamming into targets with its whole body.',
    });
  });

  it('usa el slug legible como nombre y deja la descripción vacía si no hay textos', () => {
    expect(
      toMoveDetail({
        ...hurricaneDto,
        name: 'shell-side-arm',
        names: [],
        flavor_text_entries: [],
      }),
    ).toMatchObject({ name: 'Shell Side Arm', description: '' });
  });
});
