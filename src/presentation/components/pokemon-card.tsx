import { Image, Pressable, StyleSheet, Text } from 'react-native';
import {
  LIST_COLUMNS,
  capitalize,
  colors,
  fontSize,
  fontWeight,
  formatPokemonNumber,
  radius,
  sizes,
  spacing,
} from '../../core';
import { PokemonSummary } from '../../domain';

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onPress: () => void;
}

// Tarjeta pulsable con la imagen, el número y el nombre de un Pokémon.
export const PokemonCard = ({ pokemon, onPress }: PokemonCardProps) => (
  <Pressable style={styles.card} onPress={onPress}>
    <Image
      source={{ uri: pokemon.imageUrl }}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
    <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    flex: 1 / LIST_COLUMNS,
    alignItems: 'center',
    margin: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.md,
  },
  image: { width: sizes.cardImage, height: sizes.cardImage },
  number: { fontSize: fontSize.caption, color: colors.textSecondary },
  name: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
