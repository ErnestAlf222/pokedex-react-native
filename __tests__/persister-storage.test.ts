import { createMMKV } from 'react-native-mmkv';
import { createPersisterStorage } from '../src/core';

// Pruebas del adaptador entre MMKV y el storage del persister (MMKV usa su mock en memoria bajo Jest).
describe('createPersisterStorage', () => {
  const persisterStorage = createPersisterStorage(
    createMMKV({ id: 'test-storage' }),
  );

  it('devuelve el valor guardado con setItem', () => {
    persisterStorage.setItem('clave', 'valor');

    expect(persisterStorage.getItem('clave')).toBe('valor');
  });

  it('devuelve null para una clave inexistente', () => {
    expect(persisterStorage.getItem('no-existe')).toBeNull();
  });

  it('elimina la clave con removeItem', () => {
    persisterStorage.setItem('temporal', '1');
    persisterStorage.removeItem('temporal');

    expect(persisterStorage.getItem('temporal')).toBeNull();
  });
});
