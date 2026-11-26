import { StatusBar } from 'react-native';
import {
  AppNavigator,
  AppProviders,
  OfflineBanner,
} from './src/presentation';

// Componente raíz: monta los providers, la navegación y el banner de conexión (una sola vez, encima).
const App = () => (
  <AppProviders>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
    <OfflineBanner />
  </AppProviders>
);

export default App;
