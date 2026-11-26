import { Image, Pressable, StyleSheet, Text } from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  formatPokemonNumber,
  formatSlug,
  radius,
  sizes,
  spacing,
} from '../../core';
import { EvolutionStage } from '../../domain';

interface EvolutionStageItemProps {
  stage: EvolutionStage;
  isCurrent: boolean;
  onPress: () => void;
}

// Etapa de la cadena evolutiva; la actual se resalta y no es pulsable.
export const EvolutionStageItem = ({
  stage,
  isCurrent,
  onPress,
}: EvolutionStageItemProps) => (
  <Pressable
    disabled={isCurrent}
    onPress={onPress}
    style={[styles.item, isCurrent && styles.current]}>
    <Image
      source={{ uri: stage.imageUrl }}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.number}>{formatPokemonNumber(stage.id)}</Text>
    <Text style={styles.name}>{formatSlug(stage.name)}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  item: {
    width: sizes.evolutionItem,
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: sizes.borderThick,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  current: { borderColor: colors.primary },
  image: { width: sizes.evolutionImage, height: sizes.evolutionImage },
  number: { fontSize: fontSize.caption, color: colors.textSecondary },
  name: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
