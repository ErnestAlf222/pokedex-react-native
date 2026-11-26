import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactTestRenderer from 'react-test-renderer';
import {
  AppError,
  AppErrorType,
  ERROR_MESSAGES,
  SEARCH_DEBOUNCE_MS,
} from '../src/core';
import { PokemonSummary, PokemonTypeIndex } from '../src/domain';
import {
  EmptyView,
  ErrorView,
  PokemonCard,
  PokemonListScreen,
  SearchBar,
  TypeFilterChips,
  container,
} from '../src/presentation';

// Simula useNavigation porque la prueba no monta un NavigationContainer.
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Mock oficial de safe-area: la cabecera lee los insets sin un SafeAreaProvider.
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

// Reemplaza el contenedor para controlar el resultado de los casos de uso.
jest.mock('../src/presentation/di', () => ({
  container: {
    getPokemonPageUseCase: { execute: jest.fn() },
    getAllPokemonUseCase: { execute: jest.fn() },
    getPokemonTypeIndexUseCase: { execute: jest.fn() },
  },
}));

const execute = jest.mocked(container.getPokemonPageUseCase.execute);
const executeAll = jest.mocked(container.getAllPokemonUseCase.execute);
const executeTypeIndex = jest.mocked(
  container.getPokemonTypeIndexUseCase.execute,
);

// Índice de tipos de prueba (slot 1 primero).
const typeIndex: PokemonTypeIndex = {
  1: ['grass', 'poison'],
  4: ['fire'],
  5: ['fire'],
  6: ['fire', 'flying'],
  7: ['water'],
};

// Crea un resumen de prueba; la imagen no influye en estas pruebas.
const pokemon = (id: number, name: string): PokemonSummary => ({
  id,
  name,
  imageUrl: '',
});

const allPokemon: PokemonSummary[] = [
  pokemon(1, 'bulbasaur'),
  pokemon(4, 'charmander'),
  pokemon(5, 'charmeleon'),
  pokemon(6, 'charizard'),
  pokemon(7, 'squirtle'),
];

// Cede un ciclo de timers para que react-query notifique el resultado.
const flushQuery = () =>
  ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });

const mounted: ReactTestRenderer.ReactTestRenderer[] = [];

// Desmonta las pantallas montadas para que los timers internos de la lista no disparen tras la prueba.
afterEach(async () => {
  await ReactTestRenderer.act(async () => {
    mounted.splice(0).forEach(renderer => renderer.unmount());
  });
});

// Monta la pantalla con un QueryClient sin reintentos ni timers de caché.
const renderScreen = async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(
      <QueryClientProvider client={queryClient}>
        <PokemonListScreen />
      </QueryClientProvider>,
    );
  });
  mounted.push(renderer);
  await flushQuery();
  return renderer;
};

// Enfoca la barra, escribe el texto y espera al debounce y a la carga de la lista completa.
const searchFor = async (
  renderer: ReactTestRenderer.ReactTestRenderer,
  text: string,
) => {
  await ReactTestRenderer.act(async () => {
    const searchBar = renderer.root.findByType(SearchBar);
    searchBar.props.onFocus();
    searchBar.props.onChangeText(text);
  });
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve =>
      setTimeout(resolve, SEARCH_DEBOUNCE_MS + 50),
    );
  });
  await flushQuery();
  await flushQuery();
};

// Elige un chip de tipo y espera a que se cargue la lista completa.
const selectType = async (
  renderer: ReactTestRenderer.ReactTestRenderer,
  type: string,
) => {
  await ReactTestRenderer.act(async () => {
    renderer.root.findByType(TypeFilterChips).props.onSelect(type);
  });
  await flushQuery();
  await flushQuery();
};

// Nombres de las tarjetas visibles.
const cardNames = (renderer: ReactTestRenderer.ReactTestRenderer) =>
  renderer.root.findAllByType(PokemonCard).map(card => card.props.pokemon.name);

// Pruebas del estado de error de la pantalla de listado.
describe('PokemonListScreen con el caso de uso fallando', () => {
  beforeEach(() => {
    execute.mockReset();
    executeTypeIndex.mockReset();
    executeTypeIndex.mockRejectedValue(
      new AppError(AppErrorType.Network, ERROR_MESSAGES.network),
    );
    execute.mockRejectedValue(
      new AppError(AppErrorType.Network, ERROR_MESSAGES.network),
    );
  });

  it('muestra ErrorView con el mensaje de config', async () => {
    const renderer = await renderScreen();

    expect(renderer.root.findByType(ErrorView).props.message).toBe(
      ERROR_MESSAGES.network,
    );
  });

  it('vuelve a llamar al caso de uso al pulsar reintentar', async () => {
    const renderer = await renderScreen();
    expect(execute).toHaveBeenCalledTimes(1);

    await ReactTestRenderer.act(async () => {
      renderer.root.findByType(ErrorView).props.onRetry();
    });
    await flushQuery();

    expect(execute).toHaveBeenCalledTimes(2);
  });
});

// Pruebas de la búsqueda local desde la barra del listado.
describe('PokemonListScreen con la barra de búsqueda', () => {
  beforeEach(() => {
    execute.mockReset();
    executeAll.mockReset();
    executeTypeIndex.mockReset();
    executeTypeIndex.mockResolvedValue(typeIndex);
    execute.mockResolvedValue({
      items: [pokemon(1, 'bulbasaur'), pokemon(2, 'ivysaur')],
      nextOffset: null,
    });
    executeAll.mockResolvedValue(allPokemon);
  });

  it('no pide la lista completa al abrir la pantalla', async () => {
    await renderScreen();

    expect(executeAll).not.toHaveBeenCalled();
  });

  it('muestra solo las coincidencias al escribir en la barra', async () => {
    const renderer = await renderScreen();

    await searchFor(renderer, 'char');

    expect(
      renderer.root
        .findAllByType(PokemonCard)
        .map(card => card.props.pokemon.name),
    ).toEqual(['charmander', 'charmeleon', 'charizard']);
  });

  it('muestra el estado sin resultados con lo buscado', async () => {
    const renderer = await renderScreen();

    await searchFor(renderer, 'zzz');

    expect(renderer.root.findAllByType(PokemonCard)).toHaveLength(0);
    expect(renderer.root.findByType(EmptyView).props.message).toContain('zzz');
  });
});

// Pruebas del filtro por tipo con los chips del listado.
describe('PokemonListScreen con el filtro por tipo', () => {
  beforeEach(() => {
    execute.mockReset();
    executeAll.mockReset();
    executeTypeIndex.mockReset();
    executeTypeIndex.mockResolvedValue(typeIndex);
    execute.mockResolvedValue({
      items: [pokemon(1, 'bulbasaur'), pokemon(2, 'ivysaur')],
      nextOffset: null,
    });
    executeAll.mockResolvedValue(allPokemon);
  });

  it('deriva los chips del índice de tipos', async () => {
    const renderer = await renderScreen();

    expect(renderer.root.findByType(TypeFilterChips).props.types).toEqual([
      'fire',
      'flying',
      'grass',
      'poison',
      'water',
    ]);
  });

  it('muestra solo los Pokémon del tipo elegido y vuelve a la lista con Todos', async () => {
    const renderer = await renderScreen();

    await selectType(renderer, 'fire');
    expect(cardNames(renderer)).toEqual([
      'charmander',
      'charmeleon',
      'charizard',
    ]);

    await selectType(renderer, '');
    expect(cardNames(renderer)).toEqual(['bulbasaur', 'ivysaur']);
  });

  it('combina el texto buscado con el tipo elegido', async () => {
    const renderer = await renderScreen();

    await selectType(renderer, 'water');
    await searchFor(renderer, 'char');

    expect(renderer.root.findAllByType(PokemonCard)).toHaveLength(0);
    const message = renderer.root.findByType(EmptyView).props.message;
    expect(message).toContain('char');
    expect(message).toContain('Water');
  });

  it('oculta los chips y mantiene el listado si no hay índice de tipos', async () => {
    executeTypeIndex.mockRejectedValue(
      new AppError(AppErrorType.Network, ERROR_MESSAGES.network),
    );
    const renderer = await renderScreen();

    expect(renderer.root.findAllByType(TypeFilterChips)).toHaveLength(0);
    expect(cardNames(renderer)).toEqual(['bulbasaur', 'ivysaur']);
  });
});
