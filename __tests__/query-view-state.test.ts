import { getQueryViewState } from '../src/core';

// Pruebas del helper que decide qué mostrar según el estado de la consulta.
describe('getQueryViewState', () => {
  it('pausada sin datos: sin conexión', () => {
    expect(
      getQueryViewState({
        data: undefined,
        status: 'pending',
        fetchStatus: 'paused',
      }),
    ).toBe('offline');
  });

  it('pausada con datos: sigue mostrando el contenido', () => {
    expect(
      getQueryViewState({
        data: [1],
        status: 'success',
        fetchStatus: 'paused',
      }),
    ).toBe('content');
  });

  it('pausada con solo datos de placeholder: sin conexión', () => {
    expect(
      getQueryViewState({
        data: { id: 1 },
        status: 'success',
        fetchStatus: 'paused',
        isPlaceholderData: true,
      }),
    ).toBe('offline');
  });

  it('cargando con placeholder y red: conserva el contenido anterior', () => {
    expect(
      getQueryViewState({
        data: { id: 1 },
        status: 'success',
        fetchStatus: 'fetching',
        isPlaceholderData: true,
      }),
    ).toBe('content');
  });

  it('error normal sin datos: error', () => {
    expect(
      getQueryViewState({
        data: undefined,
        status: 'error',
        fetchStatus: 'idle',
      }),
    ).toBe('error');
  });

  it('cargando sin datos: loading', () => {
    expect(
      getQueryViewState({
        data: undefined,
        status: 'pending',
        fetchStatus: 'fetching',
      }),
    ).toBe('loading');
  });
});
