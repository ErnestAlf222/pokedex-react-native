import ReactTestRenderer from 'react-test-renderer';
import {
  ALL_GENERATIONS_VALUE,
  ALL_TYPES_VALUE,
  DEFAULT_SORT_ORDER,
  SEARCH_DEBOUNCE_MS,
} from '../src/core';
import { toPokemonGenerationIndex } from '../src/data';
import {
  container,
  usePokemonFilters,
  usePokemonGenerationIndex,
} from '../src/presentation';
import {
  generation1Dto,
  generation2Dto,
} from '../__fixtures__/generation-data';
import {
  cleanupRenders,
  createTestQueryClient,
  renderHookWithClient,
} from '../__fixtures__/render-utils';

// Reemplaza el contenedor para controlar el resultado de los casos de uso.
jest.mock('../src/presentation/di', () => ({
  container: {
    getPokemonGenerationIndexUseCase: { execute: jest.fn() },
  },
}));

const executeGenerations = jest.mocked(
  container.getPokemonGenerationIndexUseCase.execute,
);

const index = toPokemonGenerationIndex([generation1Dto, generation2Dto]);

afterEach(cleanupRenders);

beforeEach(() => {
  jest.resetAllMocks();
});

// Pruebas del hook del índice de generaciones: éxito, fallo y petición solo cuando hace falta.
describe('usePokemonGenerationIndex', () => {
  it('devuelve el índice cuando está habilitado', async () => {
    executeGenerations.mockResolvedValue(index);
    const { result } = await renderHookWithClient(
      () => usePokemonGenerationIndex({ enabled: true }),
      createTestQueryClient(),
    );

    expect(result.current?.data?.generations).toHaveLength(2);
    expect(result.current?.data?.bySpecies[155]).toBe(2);
  });

  it('no pide nada mientras no está habilitado', async () => {
    executeGenerations.mockResolvedValue(index);
    const { result } = await renderHookWithClient(
      () => usePokemonGenerationIndex({ enabled: false }),
      createTestQueryClient(),
    );

    expect(executeGenerations).not.toHaveBeenCalled();
    expect(result.current?.data).toBeUndefined();
  });

  it('con error deja data en undefined y el estado en error', async () => {
    executeGenerations.mockRejectedValue(new Error('sin red'));
    const { result } = await renderHookWithClient(
      () => usePokemonGenerationIndex({ enabled: true }),
      createTestQueryClient(),
    );

    expect(result.current?.data).toBeUndefined();
    expect(result.current?.status).toBe('error');
  });

  it('comparte la caché: un segundo montaje no vuelve a pedir', async () => {
    executeGenerations.mockResolvedValue(index);
    const client = createTestQueryClient();
    await renderHookWithClient(
      () => usePokemonGenerationIndex({ enabled: true }),
      client,
    );
    await renderHookWithClient(
      () => usePokemonGenerationIndex({ enabled: true }),
      client,
    );

    expect(executeGenerations).toHaveBeenCalledTimes(1);
  });
});

// Ejecuta un cambio de estado del hook dentro de act.
const change = (action: () => void) =>
  ReactTestRenderer.act(async () => {
    action();
  });

// Pruebas del estado único de filtros: búsqueda con debounce, tipo, generación, orden, contador y limpiar.
describe('usePokemonFilters', () => {
  const mount = async () =>
    (
      await renderHookWithClient(
        () => usePokemonFilters(),
        createTestQueryClient(),
      )
    ).result;

  it('parte sin filtros activos', async () => {
    const result = await mount();

    expect(result.current?.criteria).toEqual({
      query: '',
      type: ALL_TYPES_VALUE,
      generation: ALL_GENERATIONS_VALUE,
      order: DEFAULT_SORT_ORDER,
    });
    expect(result.current?.activeFilterCount).toBe(0);
    expect(result.current?.isFiltering).toBe(false);
  });

  it('actualiza el texto al instante y lo pasa a los criterios tras el debounce', async () => {
    const result = await mount();

    await change(() => result.current?.setQuery('char'));

    expect(result.current?.query).toBe('char');
    expect(result.current?.criteria.query).toBe('');

    await ReactTestRenderer.act(async () => {
      await new Promise<void>(resolve =>
        setTimeout(resolve, SEARCH_DEBOUNCE_MS + 50),
      );
    });

    expect(result.current?.criteria.query).toBe('char');
    expect(result.current?.isFiltering).toBe(true);
  });

  it('el tipo activa el filtrado pero no cuenta en la insignia', async () => {
    const result = await mount();

    await change(() => result.current?.setType('fire'));

    expect(result.current?.criteria.type).toBe('fire');
    expect(result.current?.isFiltering).toBe(true);
    expect(result.current?.activeFilterCount).toBe(0);
  });

  it('aplicar los filtros del panel cuenta generación y orden', async () => {
    const result = await mount();

    await change(() =>
      result.current?.applyPanelFilters({ generation: 2, order: 'name-asc' }),
    );

    expect(result.current?.criteria.generation).toBe(2);
    expect(result.current?.criteria.order).toBe('name-asc');
    expect(result.current?.activeFilterCount).toBe(2);
  });

  it('limpiar todo devuelve cada filtro a su valor inicial', async () => {
    const result = await mount();
    await change(() => {
      result.current?.setType('fire');
      result.current?.applyPanelFilters({
        generation: 3,
        order: 'number-desc',
      });
    });

    await change(() => result.current?.clearAll());

    expect(result.current?.query).toBe('');
    expect(result.current?.criteria).toEqual({
      query: '',
      type: ALL_TYPES_VALUE,
      generation: ALL_GENERATIONS_VALUE,
      order: DEFAULT_SORT_ORDER,
    });
    expect(result.current?.activeFilterCount).toBe(0);
    expect(result.current?.isFiltering).toBe(false);
  });
});
