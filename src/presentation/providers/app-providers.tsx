import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  QUERY_RETRY_COUNT,
  QUERY_STALE_TIME_MS,
  isNetworkConnected,
} from '../../core';

// Conecta el estado en línea de TanStack Query con NetInfo: pausa las consultas sin red y las reanuda al volver.
onlineManager.setEventListener(setOnline =>
  NetInfo.addEventListener(state => setOnline(isNetworkConnected(state))),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: QUERY_STALE_TIME_MS, retry: QUERY_RETRY_COUNT },
  },
});

// Raíz de providers: gestos, área segura y cliente de consultas.
export const AppProviders = ({ children }: PropsWithChildren) => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
});
