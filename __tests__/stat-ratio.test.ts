import { MAX_STAT_VALUE, getStatRatio } from '../src/core';

// Pruebas del helper que convierte un stat en un porcentaje acotado.
describe('getStatRatio', () => {
  it('devuelve 0 cuando el valor es 0', () => {
    expect(getStatRatio(0, 200)).toBe(0);
  });

  it('devuelve la proporción para un valor normal', () => {
    expect(getStatRatio(100, 200)).toBe(0.5);
  });

  it('limita a 1 cuando el valor supera el máximo', () => {
    expect(getStatRatio(300, 200)).toBe(1);
  });

  it('usa el máximo de config por defecto', () => {
    expect(getStatRatio(MAX_STAT_VALUE)).toBe(1);
  });
});
