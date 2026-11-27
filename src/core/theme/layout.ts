import { ViewStyle } from 'react-native';
import { spacing } from './spacing';

const center: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.lg,
};

// Separaciones verticales del encabezado del listado: título → búsqueda → chips → primera fila de tarjetas.
const listHeader = {
  searchTop: spacing.md,
  chipsTop: spacing.lg,
  chipsBottom: spacing.sm,
} as const;

export const layout = { center, listHeader };
