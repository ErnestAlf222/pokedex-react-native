import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ALL_GENERATIONS_VALUE,
  ROUTES,
  colors,
  getQueryViewState,
} from '../../core';
import { listTypeNames } from '../../domain';
import {
  FilterFab,
  FilterSheet,
  PokemonInfiniteList,
  PokemonSearchResults,
  ScreenHeader,
  SearchBar,
  TypeFilterChips,
} from '../components';
import {
  useAllPokemon,
  usePokemonFilters,
  usePokemonGenerationIndex,
  usePokemonTypeIndex,
} from '../hooks';
import { AppNavigation } from '../navigation';

// Pantalla del listado: cabecera, búsqueda y chips fijos, botón flotante de filtros y, debajo, el listado paginado o los resultados filtrados.
export const PokemonListScreen = () => {
  const navigation = useNavigation<AppNavigation>();
  const filters = usePokemonFilters();
  const { criteria, isFiltering } = filters;
  const [hasFocusedSearch, setHasFocusedSearch] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const typeIndex = usePokemonTypeIndex().data;
  const typeNames = useMemo(() => listTypeNames(typeIndex ?? {}), [typeIndex]);
  const generationQuery = usePokemonGenerationIndex({
    enabled: isSheetOpen || criteria.generation !== ALL_GENERATIONS_VALUE,
  });
  const all = useAllPokemon({ enabled: hasFocusedSearch || isFiltering });

  // Abre el detalle del Pokémon elegido.
  const openDetail = (id: number) =>
    navigation.navigate(ROUTES.pokemonDetail, { id });

  return (
    <View style={styles.screen}>
      <ScreenHeader />
      <SearchBar
        value={filters.query}
        onChangeText={filters.setQuery}
        onFocus={() => setHasFocusedSearch(true)}
      />
      {typeIndex && (
        <TypeFilterChips
          types={typeNames}
          selected={criteria.type}
          onSelect={filters.setType}
        />
      )}
      <View style={styles.results}>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={isFiltering ? 'none' : 'auto'}
          importantForAccessibility={isFiltering ? 'no-hide-descendants' : 'auto'}>
          <PokemonInfiniteList
            typeIndex={typeIndex}
            onPressPokemon={openDetail}
          />
        </View>
        {isFiltering && (
          <View style={[StyleSheet.absoluteFill, styles.overlay]}>
            <PokemonSearchResults
              all={all}
              criteria={criteria}
              typeIndex={typeIndex}
              generationIndex={generationQuery.data}
              onPressPokemon={openDetail}
            />
          </View>
        )}
      </View>
      <FilterFab
        count={filters.activeFilterCount}
        onPress={() => setIsSheetOpen(true)}
      />
      <FilterSheet
        visible={isSheetOpen}
        generation={criteria.generation}
        order={criteria.order}
        generations={generationQuery.data?.generations ?? []}
        generationsState={getQueryViewState(generationQuery)}
        onApply={filters.applyPanelFilters}
        onClose={() => setIsSheetOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  results: { flex: 1 },
  overlay: { backgroundColor: colors.background },
});
