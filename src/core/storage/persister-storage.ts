import type { MMKV } from 'react-native-mmkv';

// Adapta una instancia de MMKV a la interfaz de storage síncrono que pide el persister.
export const createPersisterStorage = (mmkv: MMKV) => ({
  getItem: (key: string): string | null => mmkv.getString(key) ?? null,
  setItem: (key: string, value: string): void => mmkv.set(key, value),
  removeItem: (key: string): void => {
    mmkv.remove(key);
  },
});
