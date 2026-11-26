import { StyleSheet, Text } from 'react-native';
import {
  DETAIL_ICONS,
  UI_MESSAGES,
  colors,
  fontSize,
  getQueryViewState,
  sizes,
} from '../../core';
import { usePokemonEffectiveness } from '../hooks';
import { DetailSection } from './detail-section';
import { EffectivenessGroup } from './effectiveness-group';
import { PokeballLoader } from './pokeball-loader';

interface EffectivenessSectionProps {
  typeNames: string[];
  color: string;
  enabled: boolean;
}

// Debilidades, resistencias e inmunidades del Pokémon; sin red y sin dato muestra un aviso discreto sin bloquear el resto.
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
        <>
          <EffectivenessGroup
            title={UI_MESSAGES.weakTo}
            items={data.weaknesses}
          />
          <EffectivenessGroup
            title={UI_MESSAGES.resists}
            items={data.resistances}
          />
          <EffectivenessGroup
            title={UI_MESSAGES.immuneTo}
            items={data.immunities}
            showMultiplier={false}
          />
        </>
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
