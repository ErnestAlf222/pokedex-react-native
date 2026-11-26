import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ROUTES, SEARCH_DEBOUNCE_MS } from '../../core';
import {
  PokemonInfiniteList,
  PokemonSearchResults,
  SearchBar,
} from '../components';
import { useAllPokemon, useDebouncedValue } from '../hooks';
import { AppNavigation } from '../navigation';

// Pantalla del listado: barra de búsqueda fija y, debajo, el listado paginado o los resultados.
export const PokemonListScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const [query, setQuery] = useState('');
  const [hasFocusedSearch, setHasFocusedSearch] = useState(false);
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const isSearching = debouncedQuery.trim() !== '';
  const all = useAllPokemon({ enabled: hasFocusedSearch || isSearching });

  // Abre el detalle del Pokémon elegido.
  const openDetail = (id: number) =>
    navigation.navigate(ROUTES.pokemonDetail, { id });

  return (
    <View style={styles.screen}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onFocus={() => setHasFocusedSearch(true)}
      />
      {isSearching ? (
        <PokemonSearchResults
          all={all}
          query={debouncedQuery}
          onPressPokemon={openDetail}
        />
      ) : (
        <PokemonInfiniteList onPressPokemon={openDetail} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
