import { ViewStyle } from 'react-native';
import { spacing } from './spacing';

const center: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.lg,
};

// Mensaje alineado arriba: no depende de la altura visible, así el teclado no lo tapa.
const emptyTop: ViewStyle = {
  alignItems: 'center',
  padding: spacing.lg,
  paddingTop: spacing.xl * 2,
};

// Separaciones verticales del encabezado del listado: título → búsqueda → chips → primera fila de tarjetas.
const listHeader = {
  searchTop: spacing.md,
  chipsTop: spacing.lg,
  chipsBottom: spacing.sm,
} as const;

export const layout = { center, emptyTop, listHeader };
