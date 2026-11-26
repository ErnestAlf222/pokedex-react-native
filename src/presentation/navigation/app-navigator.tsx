import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../../core';
import { PokemonDetailScreen, PokemonListScreen } from '../screens';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Navegador raíz con el listado y el detalle (ambos sin cabecera nativa).
export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.pokemonList}
        component={PokemonListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.pokemonDetail}
        component={PokemonDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
