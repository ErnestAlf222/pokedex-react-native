import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import {
  AppError,
  AppErrorType,
  ERROR_MESSAGES,
  SEARCH_DEBOUNCE_MS,
  layout,
} from '../src/core';
import {
  PokemonGenerationIndex,
  PokemonSummary,
  PokemonTypeIndex,
} from '../src/domain';
import {
  EmptyView,
  ErrorView,
  FilterFab,
  FilterSheet,
  PokemonCard,
  PokemonInfiniteList,
  PokemonListScreen,
  PokemonSearchResults,
  SearchBar,
  TypeFilterChips,
  container,
} from '../src/presentation';
import { pressText } from '../__fixtures__/render-utils';

// Simula useNavigation porque la prueba no monta un NavigationContainer.
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Mock oficial de safe-area: la cabecera lee los insets sin un SafeAreaProvider.
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

// Reemplaza el contenedor para controlar el resultado de los casos de uso.
jest.mock('../src/presentation/di', () => ({
  container: {
    getPokemonPageUseCase: { execute: jest.fn() },
    getAllPokemonUseCase: { execute: jest.fn() },
    getPokemonTypeIndexUseCase: { execute: jest.fn() },
    getPokemonGenerationIndexUseCase: { execute: jest.fn() },
  },
}));

const execute = jest.mocked(container.getPokemonPageUseCase.execute);
const executeAll = jest.mocked(container.getAllPokemonUseCase.execute);
const executeTypeIndex = jest.mocked(
  container.getPokemonTypeIndexUseCase.execute,
);
const executeGenerations = jest.mocked(
  container.getPokemonGenerationIndexUseCase.execute,
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

// Nombres de las tarjetas visibles: las de los resultados si se está filtrando, y si no las del listado.
const cardNames = (renderer: ReactTestRenderer.ReactTestRenderer) => {
  const [results] = renderer.root.findAllByType(PokemonSearchResults);
  return (results ?? renderer.root)
    .findAllByType(PokemonCard)
    .map(card => card.props.pokemon.name);
};

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

    expect(cardNames(renderer)).toEqual([
      'charmander',
      'charmeleon',
      'charizard',
    ]);
  });

  it('muestra el estado sin resultados con lo buscado', async () => {
    const renderer = await renderScreen();

    await searchFor(renderer, 'zzz');

    expect(cardNames(renderer)).toHaveLength(0);
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

    expect(cardNames(renderer)).toHaveLength(0);
    const message = renderer.root.findByType(EmptyView).props.message;
    expect(message).toContain('char');
    expect(message).toContain('Agua');
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

// Índice de generaciones de prueba: Bulbasaur y los de fuego en la 1; Charizard y Squirtle en la 2.
const generationIndex: PokemonGenerationIndex = {
  generations: [
    { id: 1, name: 'Generación I', region: 'kanto' },
    { id: 2, name: 'Generación II', region: 'johto' },
  ],
  bySpecies: { 1: 1, 4: 1, 5: 1, 6: 2, 7: 2 },
};

// Abre el panel de filtros con el botón flotante y espera a que carguen las generaciones.
const openSheet = async (renderer: ReactTestRenderer.ReactTestRenderer) => {
  await ReactTestRenderer.act(async () => {
    renderer.root.findByType(FilterFab).props.onPress();
  });
  await flushQuery();
  await flushQuery();
};

// Pruebas del panel de filtros (generación y orden) y del scroll del listado.
describe('PokemonListScreen con el panel de filtros', () => {
  beforeEach(() => {
    execute.mockReset();
    executeAll.mockReset();
    executeTypeIndex.mockReset();
    executeGenerations.mockReset();
    executeTypeIndex.mockResolvedValue(typeIndex);
    executeGenerations.mockResolvedValue(generationIndex);
    execute.mockResolvedValue({
      items: [pokemon(1, 'bulbasaur'), pokemon(2, 'ivysaur')],
      nextOffset: null,
    });
    executeAll.mockResolvedValue(allPokemon);
  });

  it('mantiene el listado infinito montado al buscar y al borrar la búsqueda', async () => {
    const renderer = await renderScreen();

    expect(renderer.root.findAllByType(PokemonInfiniteList)).toHaveLength(1);

    await searchFor(renderer, 'char');
    expect(renderer.root.findAllByType(PokemonInfiniteList)).toHaveLength(1);
    expect(renderer.root.findAllByType(PokemonSearchResults)).toHaveLength(1);

    await searchFor(renderer, '');
    expect(renderer.root.findAllByType(PokemonInfiniteList)).toHaveLength(1);
    expect(renderer.root.findAllByType(PokemonSearchResults)).toHaveLength(0);
    expect(cardNames(renderer)).toEqual(['bulbasaur', 'ivysaur']);
  });

  it('no pide las generaciones hasta abrir el panel y la insignia parte en 0', async () => {
    const renderer = await renderScreen();

    expect(executeGenerations).not.toHaveBeenCalled();
    expect(renderer.root.findByType(FilterFab).props.count).toBe(0);

    await openSheet(renderer);

    expect(executeGenerations).toHaveBeenCalledTimes(1);
    expect(renderer.root.findByType(FilterSheet).props.visible).toBe(true);
  });

  it('filtra por generación y orden desde el panel y actualiza la insignia', async () => {
    const renderer = await renderScreen();
    await openSheet(renderer);

    await pressText(renderer, 'Generación II · Johto');
    await pressText(renderer, 'Número ↓');
    await pressText(renderer, 'Aplicar');
    await flushQuery();
    await flushQuery();

    expect(cardNames(renderer)).toEqual(['squirtle', 'charizard']);
    expect(renderer.root.findByType(FilterFab).props.count).toBe(2);
    expect(renderer.root.findByType(FilterSheet).props.visible).toBe(false);
  });

  it('combina la generación del panel con el tipo de los chips', async () => {
    const renderer = await renderScreen();
    await selectType(renderer, 'fire');
    await openSheet(renderer);

    await pressText(renderer, 'Generación I · Kanto');
    await pressText(renderer, 'Aplicar');
    await flushQuery();

    expect(cardNames(renderer)).toEqual(['charmander', 'charmeleon']);
    expect(renderer.root.findByType(FilterFab).props.count).toBe(1);
  });

  it('limpiar en el panel quita los filtros y vuelve al listado', async () => {
    const renderer = await renderScreen();
    await openSheet(renderer);
    await pressText(renderer, 'Generación II · Johto');
    await pressText(renderer, 'Aplicar');
    await flushQuery();
    await flushQuery();
    await openSheet(renderer);

    await pressText(renderer, 'Limpiar');
    await pressText(renderer, 'Aplicar');
    await flushQuery();

    expect(renderer.root.findByType(FilterFab).props.count).toBe(0);
    expect(renderer.root.findAllByType(PokemonSearchResults)).toHaveLength(0);
    expect(cardNames(renderer)).toEqual(['bulbasaur', 'ivysaur']);
  });

  it('el estado sin resultados va alineado arriba (el teclado no lo tapa), no centrado', async () => {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<EmptyView message="nada" />);
    });
    mounted.push(renderer);

    expect(renderer.root.findByType(View).props.style).toBe(layout.emptyTop);
  });
});
