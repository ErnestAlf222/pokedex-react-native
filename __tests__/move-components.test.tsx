import { POKEMON_QUERY_KEYS } from '../src/core';
import { toMoveDetail } from '../src/data';
import { PokemonMove } from '../src/domain';
import { MoveRow, MovesTab, container } from '../src/presentation';
import {
  growlDto,
  hurricaneDto,
  tackleDto,
} from '../__fixtures__/move-ability-data';
import {
  allTexts,
  cleanupRenders,
  createTestQueryClient,
  pressText,
  renderWithClient,
} from '../__fixtures__/render-utils';

// Reemplaza el contenedor para controlar el resultado de los casos de uso.
jest.mock('../src/presentation/di', () => ({
  container: {
    getMoveDetailUseCase: { execute: jest.fn() },
  },
}));

const executeMove = jest.mocked(container.getMoveDetailUseCase.execute);

// Cliente con los detalles de movimientos ya en caché, como tras una carga previa.
const clientWithMoves = () => {
  const client = createTestQueryClient();
  [tackleDto, growlDto, hurricaneDto].forEach(dto =>
    client.setQueryData(POKEMON_QUERY_KEYS.move(dto.name), toMoveDetail(dto)),
  );
  return client;
};

afterEach(cleanupRenders);

beforeEach(() => {
  jest.resetAllMocks();
  executeMove.mockRejectedValue(new Error('sin red'));
});

// Pruebas de la fila de un movimiento: básica sin datos y tarjeta rica con datos.
describe('MoveRow', () => {
  it('sin datos del movimiento muestra la fila básica y no rompe', async () => {
    const renderer = await renderWithClient(
      <MoveRow name="tackle" level={3} />,
      createTestQueryClient(),
    );
    const texts = allTexts(renderer);

    expect(texts).toContain('Nivel 3');
    expect(texts).toContain(' · Tackle');
    expect(texts).not.toContain('Poder');
  });

  it('con datos muestra la tarjeta: nombre en español, nivel y cifras', async () => {
    const renderer = await renderWithClient(
      <MoveRow name="tackle" level={3} />,
      clientWithMoves(),
    );
    const texts = allTexts(renderer);

    expect(texts).toEqual(
      expect.arrayContaining(['Placaje', '3', 'Poder', '40', '100%', '35']),
    );
    expect(texts).not.toContain('Nivel 3');
  });

  it('muestra "—" en el poder de un movimiento de estado y "Evo." en el nivel 0', async () => {
    const growl = await renderWithClient(
      <MoveRow name="growl" level={1} />,
      clientWithMoves(),
    );
    const hurricane = await renderWithClient(
      <MoveRow name="hurricane" level={0} />,
      clientWithMoves(),
    );

    expect(allTexts(growl)).toContain('—');
    expect(allTexts(hurricane)).toContain('Evo.');
  });

  it('al tocar la tarjeta se expande con la descripción', async () => {
    const renderer = await renderWithClient(
      <MoveRow name="tackle" level={3} />,
      clientWithMoves(),
    );

    expect(allTexts(renderer)).not.toContain('Embestida con todo el cuerpo.');

    await pressText(renderer, 'Placaje');

    expect(allTexts(renderer)).toContain('Embestida con todo el cuerpo.');
  });
});

// Pruebas de la pestaña: primeros movimientos y botón "Ver más" para el resto.
describe('MovesTab', () => {
  const moves: PokemonMove[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(
    (name, index) => ({ name, level: index + 1 }),
  );

  it('muestra solo los primeros movimientos y el botón "Ver más"', async () => {
    const renderer = await renderWithClient(
      <MovesTab moves={moves} />,
      createTestQueryClient(),
    );
    const texts = allTexts(renderer);

    expect(renderer.root.findAllByType(MoveRow)).toHaveLength(5);
    expect(texts).toContain('Ver más');
  });

  it('al pulsar "Ver más" muestra el resto y quita el botón', async () => {
    const renderer = await renderWithClient(
      <MovesTab moves={moves} />,
      createTestQueryClient(),
    );

    await pressText(renderer, 'Ver más');

    expect(renderer.root.findAllByType(MoveRow)).toHaveLength(7);
    expect(allTexts(renderer)).not.toContain('Ver más');
  });

  it('no muestra el botón si caben todos', async () => {
    const renderer = await renderWithClient(
      <MovesTab moves={moves.slice(0, 3)} />,
      createTestQueryClient(),
    );

    expect(allTexts(renderer)).not.toContain('Ver más');
  });

  it('muestra el aviso si no hay movimientos', async () => {
    const renderer = await renderWithClient(
      <MovesTab moves={[]} />,
      createTestQueryClient(),
    );

    expect(allTexts(renderer)).toContain('Sin movimientos por nivel');
  });
});
