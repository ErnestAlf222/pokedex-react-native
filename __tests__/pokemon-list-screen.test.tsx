import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactTestRenderer from 'react-test-renderer';
import { AppError, AppErrorType, ERROR_MESSAGES } from '../src/core';
import {
  ErrorView,
  PokemonListScreen,
  container,
} from '../src/presentation';

// Simula useNavigation porque la prueba no monta un NavigationContainer.
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Reemplaza el contenedor para controlar el resultado del caso de uso.
jest.mock('../src/presentation/di', () => ({
  container: { getPokemonPageUseCase: { execute: jest.fn() } },
}));

const execute = jest.mocked(container.getPokemonPageUseCase.execute);

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
