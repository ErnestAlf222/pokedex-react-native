import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactTestRenderer from 'react-test-renderer';
import {
  AppError,
  AppErrorType,
  ERROR_MESSAGES,
  SEARCH_DEBOUNCE_MS,
} from '../src/core';
import { PokemonSummary } from '../src/domain';
import {
  EmptyView,
  ErrorView,
  PokemonCard,
  PokemonListScreen,
  SearchBar,
  container,
} from '../src/presentation';

// Simula useNavigation porque la prueba no monta un NavigationContainer.
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Reemplaza el contenedor para controlar el resultado de los casos de uso.
jest.mock('../src/presentation/di', () => ({
  container: {
    getPokemonPageUseCase: { execute: jest.fn() },
    getAllPokemonUseCase: { execute: jest.fn() },
  },
}));

const execute = jest.mocked(container.getPokemonPageUseCase.execute);
const executeAll = jest.mocked(container.getAllPokemonUseCase.execute);

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

// Pruebas del estado de error de la pantalla de listado.
describe('PokemonListScreen con el caso de uso fallando', () => {
  beforeEach(() => {
    execute.mockReset();
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
