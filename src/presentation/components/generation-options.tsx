import { StyleSheet, Text } from 'react-native';
import {
  ALL_GENERATIONS_VALUE,
  QueryViewState,
  UI_MESSAGES,
  colors,
  fontSize,
  getGenerationLabel,
  sizes,
} from '../../core';
import { PokemonGeneration } from '../../domain';
import { FilterChip } from './filter-chip';
import { FilterSection } from './filter-section';
import { PokeballLoader } from './pokeball-loader';

interface GenerationOptionsProps {
  generations: PokemonGeneration[];
  state: QueryViewState;
  selected: number;
  onSelect: (generation: number) => void;
}

// Sección "Generación": "Todas" y una opción por generación con su región; mientras no hay datos muestra carga o un aviso.
export const GenerationOptions = ({
  generations,
  state,
  selected,
  onSelect,
}: GenerationOptionsProps) => (
  <FilterSection title={UI_MESSAGES.generation}>
    <FilterChip
      label={UI_MESSAGES.allGenerations}
      color={colors.primary}
      isActive={selected === ALL_GENERATIONS_VALUE}
      onPress={() => onSelect(ALL_GENERATIONS_VALUE)}
    />
    {generations.map(({ id, name, region }) => (
      <FilterChip
        key={id}
        label={getGenerationLabel(name, region)}
        color={colors.primary}
        isActive={selected === id}
        onPress={() => onSelect(id)}
      />
    ))}
    {state === 'loading' && <PokeballLoader size={sizes.loaderSmall} />}
    {(state === 'offline' || state === 'error') && (
      <Text style={styles.notice}>{UI_MESSAGES.generationsUnavailable}</Text>
    )}
  </FilterSection>
);

const styles = StyleSheet.create({
  notice: { fontSize: fontSize.caption, color: colors.textSecondary },
});
