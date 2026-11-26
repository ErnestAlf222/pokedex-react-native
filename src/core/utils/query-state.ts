export type QueryViewState = 'content' | 'loading' | 'offline' | 'error';

interface QueryStateInput {
  data: unknown;
  status: 'pending' | 'error' | 'success';
  fetchStatus: 'fetching' | 'paused' | 'idle';
  isPlaceholderData?: boolean;
}

// Decide qué mostrar según la consulta: contenido, carga, sin conexión o error.
// Una consulta pausada sin datos propios (o solo con los del placeholder) cuenta como sin conexión.
export const getQueryViewState = ({
  data,
  status,
  fetchStatus,
  isPlaceholderData = false,
}: QueryStateInput): QueryViewState => {
  const isPaused = fetchStatus === 'paused';
  const hasData = data !== undefined && !(isPlaceholderData && isPaused);
  if (hasData) {
    return 'content';
  }
  if (isPaused) {
    return 'offline';
  }
  return status === 'error' ? 'error' : 'loading';
};
