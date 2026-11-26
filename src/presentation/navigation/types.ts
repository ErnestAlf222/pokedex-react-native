import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '../../core';

export type RootStackParamList = {
  [ROUTES.pokemonList]: undefined;
  [ROUTES.pokemonDetail]: { id: number };
};

export type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

export type PokemonDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTES.pokemonDetail
>;
