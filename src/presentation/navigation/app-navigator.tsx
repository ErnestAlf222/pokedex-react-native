import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, UI_MESSAGES } from '../../core';
import { PokemonDetailScreen, PokemonListScreen } from '../screens';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Navegador raíz con el listado y el detalle (sin cabecera nativa).
export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.pokemonList}
        component={PokemonListScreen}
        options={{ title: UI_MESSAGES.listTitle }}
      />
      <Stack.Screen
        name={ROUTES.pokemonDetail}
        component={PokemonDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
