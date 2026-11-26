import { useNetInfo } from '@react-native-community/netinfo';
import { isNetworkConnected } from '../../core';

// Indica si el dispositivo tiene conexión (se asume que sí hasta que NetInfo diga lo contrario).
export const useNetworkStatus = (): boolean => isNetworkConnected(useNetInfo());
