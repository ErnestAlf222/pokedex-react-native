import { createMMKV } from 'react-native-mmkv';
import { STORAGE_ID } from '../config';

// Instancia única de MMKV de la app (caché de consultas y, más adelante, favoritos).
export const storage = createMMKV({ id: STORAGE_ID });
