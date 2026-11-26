import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  CARD_ENTER_DURATION_MS,
  CARD_GRADIENT_END,
  CARD_GRADIENT_START,
  LIST_COLUMNS,
  POKEBALL_ICON_NAME,
  PRESS_ANIMATION_MS,
  colors,
  effects,
  fontSize,
  fontWeight,
  formatPokemonNumber,
  formatSlug,
  getTypeColor,
  radius,
  shadows,
  sizes,
  spacing,
  withAlpha,
} from '../../core';
import { PokemonSummary } from '../../domain';
import { TypeBadge } from './type-badge';

interface PokemonCardProps {
  pokemon: PokemonSummary;
  types?: string[];
  enterDelayMs?: number;
  onPress: () => void;
}

// Colores del fondo: del tipo principal hacia la superficie; neutro si no hay tipos.
const getCardColors = (types: string[]): [string, string] => {
  const [mainType] = types;
  return [
    mainType === undefined
      ? colors.surface
      : withAlpha(getTypeColor(mainType), effects.cardTintOpacity),
    colors.surface,
  ];
};

// Tarjeta con degradado por tipo, marca de agua, imagen grande y animaciones de entrada y pulsación.
export const PokemonCard = ({
  pokemon,
  types = [],
  enterDelayMs,
  onPress,
}: PokemonCardProps) => {
  const scale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const animateScale = (value: number) => () => {
    scale.value = withTiming(value, { duration: PRESS_ANIMATION_MS });
  };

  return (
    <Animated.View
      style={styles.cell}
      entering={
        enterDelayMs === undefined
          ? undefined
          : FadeInDown.delay(enterDelayMs).duration(CARD_ENTER_DURATION_MS)
      }>
      <Pressable
        onPress={onPress}
        onPressIn={animateScale(effects.pressedScale)}
        onPressOut={animateScale(1)}>
        <Animated.View style={[styles.card, pressStyle]}>
          <View style={styles.clip}>
            <LinearGradient
              colors={getCardColors(types)}
              start={CARD_GRADIENT_START}
              end={CARD_GRADIENT_END}
              style={StyleSheet.absoluteFill}
            />
            <MaterialIcons
              name={POKEBALL_ICON_NAME}
              size={sizes.cardWatermark}
              color={colors.textPrimary}
              style={styles.watermark}
            />
          </View>
          <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
          <Image
            source={{ uri: pokemon.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name} numberOfLines={1}>
            {formatSlug(pokemon.name)}
          </Text>
          <View style={styles.badges}>
            {types.map(type => (
              <TypeBadge key={type} type={type} compact />
            ))}
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cell: { flex: 1 / LIST_COLUMNS, margin: spacing.xs },
  card: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    ...shadows.card,
  },
  clip: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    borderRadius: radius.md,
  },
  watermark: {
    position: 'absolute',
    right: sizes.cardWatermarkOffset,
    bottom: sizes.cardWatermarkOffset,
    opacity: effects.cardWatermarkOpacity,
  },
  number: {
    alignSelf: 'flex-end',
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    opacity: effects.cardNumberOpacity,
  },
  image: {
    alignSelf: 'center',
    width: sizes.cardImage,
    height: sizes.cardImage,
  },
  name: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'left',
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
    minHeight: sizes.badgeRow,
  },
});
