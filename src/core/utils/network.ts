interface ConnectionState {
  isConnected: boolean | null;
}

// Considera que hay conexión salvo que NetInfo informe explícitamente que no la hay.
export const isNetworkConnected = ({ isConnected }: ConnectionState): boolean =>
  isConnected !== false;
