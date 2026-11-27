import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';

// Cliente de consultas para pruebas: sin reintentos para que un fallo se vea de inmediato.
export const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

// Deja pasar los microtareas pendientes (resolución de promesas de las consultas).
export const settle = () =>
  ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });

// Renderers y clientes montados por las pruebas, para liberarlos al terminar cada una.
const mounted: {
  renderer: ReactTestRenderer.ReactTestRenderer;
  client: QueryClient;
}[] = [];

// Desmonta todo lo montado y vacía las cachés, para que no queden temporizadores abiertos.
export const cleanupRenders = () =>
  ReactTestRenderer.act(async () => {
    mounted.splice(0).forEach(({ renderer, client }) => {
      renderer.unmount();
      client.clear();
    });
  });

// Monta un elemento dentro del proveedor de consultas y espera a que se asiente.
export const renderWithClient = async (
  ui: ReactElement,
  client: QueryClient,
): Promise<ReactTestRenderer.ReactTestRenderer> => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
    );
  });
  mounted.push({ renderer, client });
  await settle();
  return renderer;
};

// Monta un hook dentro del proveedor de consultas y devuelve una referencia a su último resultado.
export const renderHookWithClient = async <R,>(
  hook: () => R,
  client: QueryClient,
) => {
  const result: { current: R | undefined } = { current: undefined };
  const Probe = () => {
    result.current = hook();
    return null;
  };
  const renderer = await renderWithClient(<Probe />, client);
  return { result, renderer };
};

// Todos los textos visibles del árbol, en orden.
export const allTexts = (
  renderer: ReactTestRenderer.ReactTestRenderer,
): string[] =>
  renderer.root
    .findAllByType(Text)
    .map(node => node.props.children)
    .flat(Infinity)
    .filter(
      (child): child is string | number =>
        typeof child === 'string' || typeof child === 'number',
    )
    .map(String);

// Pulsa el primer ancestro con onPress del texto indicado.
export const pressText = async (
  renderer: ReactTestRenderer.ReactTestRenderer,
  label: string,
) => {
  const textNode = renderer.root
    .findAllByType(Text)
    .find(node => [node.props.children].flat(Infinity).includes(label));
  let target: ReactTestRenderer.ReactTestInstance | null = textNode ?? null;
  while (target !== null && typeof target.props.onPress !== 'function') {
    target = target.parent;
  }
  await ReactTestRenderer.act(async () => {
    target?.props.onPress();
  });
};
