import { POKEMON_QUERY_KEYS } from '../src/core';
import {
  container,
  useAbilityDetail,
  useMoveDetail,
} from '../src/presentation';
import { toAbilityDetail, toMoveDetail } from '../src/data';
import { overgrowDto, tackleDto } from '../__fixtures__/move-ability-data';
import {
  cleanupRenders,
  createTestQueryClient,
  renderHookWithClient,
} from '../__fixtures__/render-utils';

// Reemplaza el contenedor para controlar el resultado de los casos de uso.
jest.mock('../src/presentation/di', () => ({
  container: {
    getMoveDetailUseCase: { execute: jest.fn() },
    getAbilityDetailUseCase: { execute: jest.fn() },
  },
}));

const executeMove = jest.mocked(container.getMoveDetailUseCase.execute);
const executeAbility = jest.mocked(container.getAbilityDetailUseCase.execute);

afterEach(cleanupRenders);

beforeEach(() => {
  jest.resetAllMocks();
});

// Pruebas del hook de detalle de movimiento: éxito, fallo y caché compartida por nombre.
describe('useMoveDetail', () => {
  it('devuelve el detalle del movimiento pedido por nombre', async () => {
    executeMove.mockResolvedValue(toMoveDetail(tackleDto));
    const { result } = await renderHookWithClient(
      () => useMoveDetail('tackle'),
      createTestQueryClient(),
    );

    expect(executeMove).toHaveBeenCalledWith('tackle');
    expect(result.current?.data?.name).toBe('Placaje');
  });

  it('sin datos y con error deja data en undefined y el estado en error', async () => {
    executeMove.mockRejectedValue(new Error('sin red'));
    const { result } = await renderHookWithClient(
      () => useMoveDetail('tackle'),
      createTestQueryClient(),
    );

    expect(result.current?.data).toBeUndefined();
    expect(result.current?.status).toBe('error');
  });

  it('comparte la caché por nombre: un segundo montaje no vuelve a pedir', async () => {
    executeMove.mockResolvedValue(toMoveDetail(tackleDto));
    const client = createTestQueryClient();
    await renderHookWithClient(() => useMoveDetail('tackle'), client);
    const second = await renderHookWithClient(
      () => useMoveDetail('tackle'),
      client,
    );

    expect(executeMove).toHaveBeenCalledTimes(1);
    expect(second.result.current?.data?.name).toBe('Placaje');
    expect(
      client.getQueryData(POKEMON_QUERY_KEYS.move('tackle')),
    ).toBeDefined();
  });

  it('usa una clave distinta por movimiento', async () => {
    executeMove.mockResolvedValue(toMoveDetail(tackleDto));
    const client = createTestQueryClient();
    await renderHookWithClient(() => useMoveDetail('tackle'), client);
    await renderHookWithClient(() => useMoveDetail('growl'), client);

    expect(executeMove).toHaveBeenCalledTimes(2);
  });
});

// Pruebas del hook de detalle de habilidad: éxito, fallo y caché compartida por nombre.
describe('useAbilityDetail', () => {
  it('devuelve el detalle de la habilidad pedida por nombre', async () => {
    executeAbility.mockResolvedValue(toAbilityDetail(overgrowDto));
    const { result } = await renderHookWithClient(
      () => useAbilityDetail('overgrow'),
      createTestQueryClient(),
    );

    expect(executeAbility).toHaveBeenCalledWith('overgrow');
    expect(result.current?.data?.name).toBe('Espesura');
  });

  it('sin datos y con error deja data en undefined y el estado en error', async () => {
    executeAbility.mockRejectedValue(new Error('sin red'));
    const { result } = await renderHookWithClient(
      () => useAbilityDetail('overgrow'),
      createTestQueryClient(),
    );

    expect(result.current?.data).toBeUndefined();
    expect(result.current?.status).toBe('error');
  });

  it('comparte la caché por nombre: un segundo montaje no vuelve a pedir', async () => {
    executeAbility.mockResolvedValue(toAbilityDetail(overgrowDto));
    const client = createTestQueryClient();
    await renderHookWithClient(() => useAbilityDetail('overgrow'), client);
    await renderHookWithClient(() => useAbilityDetail('overgrow'), client);

    expect(executeAbility).toHaveBeenCalledTimes(1);
  });
});
