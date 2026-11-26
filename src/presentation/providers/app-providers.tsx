import NetInfo from '@react-native-community/netinfo';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  QueryClient,
  defaultShouldDehydrateQuery,
  onlineManager,
  useIsRestoring,
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  CACHE_BUSTER,
  CACHE_MAX_AGE_MS,
  CACHE_STORAGE_KEY,
  CACHE_THROTTLE_MS,
  QUERY_RETRY_COUNT,
  QUERY_STALE_TIME_MS,
  createPersisterStorage,
  isNetworkConnected,
  storage,
} from '../../core';

// Conecta el estado en línea de TanStack Query con NetInfo: pausa las consultas sin red y las reanuda al volver.
onlineManager.setEventListener(setOnline =>
  NetInfo.addEventListener(state => setOnline(isNetworkConnected(state))),
);

// El gcTime por defecto debe ser mayor o igual que el maxAge de la caché persistida.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      retry: QUERY_RETRY_COUNT,
      gcTime: CACHE_MAX_AGE_MS,
    },
  },
});

const persistOptions = {
  persister: createSyncStoragePersister({
    storage: createPersisterStorage(storage),
    key: CACHE_STORAGE_KEY,
    throttleTime: CACHE_THROTTLE_MS,
  }),
  maxAge: CACHE_MAX_AGE_MS,
  buster: CACHE_BUSTER,
  dehydrateOptions: { shouldDehydrateQuery: defaultShouldDehydrateQuery },
};

// No muestra la app hasta restaurar la caché, para que no parpadee un loader o un error.
const RestoreGate = ({ children }: PropsWithChildren) => {
  const isRestoring = useIsRestoring();
  return isRestoring ? null : <>{children}</>;
};

// Raíz de providers: gestos, área segura y cliente de consultas con caché persistente.
export const AppProviders = ({ children }: PropsWithChildren) => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={persistOptions}>
        <RestoreGate>{children}</RestoreGate>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
});
