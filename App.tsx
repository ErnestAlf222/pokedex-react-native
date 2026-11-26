import { StatusBar } from 'react-native';
import { AppNavigator, AppProviders } from './src/presentation';

// Componente raíz: monta los providers y la navegación.
const App = () => (
  <AppProviders>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
  </AppProviders>
);

export default App;
