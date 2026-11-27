import { Image, Pressable, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
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
import { useAnimatedColor } from '../hooks';

interface EvolutionStageItemProps {
  stage: EvolutionStage;
  isCurrent: boolean;
  color: string;
  onPress: () => void;
}

// Etapa de la cadena evolutiva; la actual se resalta con el color del tipo (su borde cambia animado) y no es pulsable.
export const EvolutionStageItem = ({
  stage,
  isCurrent,
  color,
  onPress,
}: EvolutionStageItemProps) => {
  const borderStyle = useAnimatedColor(color, 'borderColor');

  return (
    <Pressable disabled={isCurrent} onPress={onPress}>
      <Animated.View style={[styles.item, isCurrent && borderStyle]}>
        <Image
          source={{ uri: stage.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.number}>{formatPokemonNumber(stage.id)}</Text>
        <Text style={styles.name}>{formatSlug(stage.name)}</Text>
      </Animated.View>
    </Pressable>
  );
};

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
  image: { width: sizes.evolutionImage, height: sizes.evolutionImage },
  number: { fontSize: fontSize.caption, color: colors.textSecondary },
  name: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
