import { StyleSheet, Text } from 'react-native';
import {
  DETAIL_ICONS,
  POKEMON_TYPES,
  UI_MESSAGES,
  colors,
  fontSize,
  getQueryViewState,
  sizes,
} from '../../core';
import { completeTypeMultipliers } from '../../domain';
import { usePokemonEffectiveness } from '../hooks';
import { DetailSection } from './detail-section';
import { EffectivenessMatrix } from './effectiveness-matrix';
import { PokeballLoader } from './pokeball-loader';

interface EffectivenessSectionProps {
  typeNames: string[];
  color: string;
  enabled: boolean;
}

// Matriz de efectividad de los 18 tipos; sin red y sin dato muestra un aviso discreto sin bloquear el resto.
export const EffectivenessSection = ({
  typeNames,
  color,
  enabled,
}: EffectivenessSectionProps) => {
  const query = usePokemonEffectiveness(typeNames, enabled);
  const viewState = getQueryViewState(query);
  const { data } = query;

  return (
    <DetailSection
      title={UI_MESSAGES.weaknesses}
      icon={DETAIL_ICONS.weaknesses}
      color={color}>
      {viewState === 'content' && data ? (
        <EffectivenessMatrix
          multipliers={completeTypeMultipliers(data, POKEMON_TYPES)}
        />
      ) : viewState === 'loading' ? (
        <PokeballLoader size={sizes.loaderSmall} />
      ) : (
        <Text style={styles.notice}>
          {UI_MESSAGES.effectivenessUnavailable}
        </Text>
      )}
    </DetailSection>
  );
};

const styles = StyleSheet.create({
  notice: { fontSize: fontSize.caption, color: colors.textSecondary },
});
