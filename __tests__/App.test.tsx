/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Reemplaza el contenedor para que la app no haga llamadas de red durante la prueba.
jest.mock('../src/presentation/di', () => ({
  container: {
    getPokemonPageUseCase: {
      execute: jest.fn().mockResolvedValue({ items: [], nextOffset: null }),
    },
    getAllPokemonUseCase: { execute: jest.fn().mockResolvedValue([]) },
    getPokemonDetailUseCase: { execute: jest.fn() },
    getPokemonTypeIndexUseCase: { execute: jest.fn().mockResolvedValue({}) },
    getTypeEffectivenessUseCase: { execute: jest.fn() },
  },
}));

// Cede un ciclo de timers para que react-query notifique los resultados.
const flushQuery = () =>
  ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });

// Verifica que la app completa se monta sin errores, incluida la restauración de la caché.
test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
  await flushQuery();
  await flushQuery();
});
