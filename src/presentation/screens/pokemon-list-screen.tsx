import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ALL_TYPES_VALUE,
  ROUTES,
  SEARCH_DEBOUNCE_MS,
  colors,
} from '../../core';
import { listTypeNames } from '../../domain';
import {
  PokemonInfiniteList,
  PokemonSearchResults,
  ScreenHeader,
  SearchBar,
  TypeFilterChips,
} from '../components';
import {
  useAllPokemon,
  useDebouncedValue,
  usePokemonTypeIndex,
} from '../hooks';
import { AppNavigation } from '../navigation';

// Pantalla del listado: cabecera, búsqueda y chips de tipo fijos; debajo, el listado paginado o los resultados filtrados.
export const PokemonListScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState(ALL_TYPES_VALUE);
  const [hasFocusedSearch, setHasFocusedSearch] = useState(false);
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const typeIndex = usePokemonTypeIndex().data;
  const typeNames = useMemo(() => listTypeNames(typeIndex ?? {}), [typeIndex]);
  const isFiltering =
    debouncedQuery.trim() !== '' || selectedType !== ALL_TYPES_VALUE;
  const all = useAllPokemon({ enabled: hasFocusedSearch || isFiltering });

  // Abre el detalle del Pokémon elegido.
  const openDetail = (id: number) =>
    navigation.navigate(ROUTES.pokemonDetail, { id });

  return (
    <View style={styles.screen}>
      <ScreenHeader />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onFocus={() => setHasFocusedSearch(true)}
      />
      {typeIndex && (
        <TypeFilterChips
          types={typeNames}
          selected={selectedType}
          onSelect={setSelectedType}
        />
      )}
      {isFiltering ? (
        <PokemonSearchResults
          all={all}
          query={debouncedQuery}
          typeName={selectedType}
          typeIndex={typeIndex}
          onPressPokemon={openDetail}
        />
      ) : (
        <PokemonInfiniteList typeIndex={typeIndex} onPressPokemon={openDetail} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
});
