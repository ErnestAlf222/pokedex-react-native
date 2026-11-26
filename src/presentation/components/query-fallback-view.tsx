import { View } from 'react-native';
import {
  ERROR_MESSAGES,
  QueryViewState,
  getErrorMessage,
  layout,
} from '../../core';
import { ErrorView } from './error-view';
import { PokeballLoader } from './pokeball-loader';

interface QueryFallbackViewProps {
  state: QueryViewState;
  error: unknown;
  onRetry: () => void;
}

// Vista para una consulta sin datos: aviso de sin conexión o error con reintento; en otro caso, el loader.
export const QueryFallbackView = ({
  state,
  error,
  onRetry,
}: QueryFallbackViewProps) =>
  state === 'offline' || state === 'error' ? (
    <ErrorView
      message={
        state === 'offline' ? ERROR_MESSAGES.offline : getErrorMessage(error)
      }
      onRetry={onRetry}
    />
  ) : (
    <View style={layout.center}>
      <PokeballLoader />
    </View>
  );
