import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  POKEBALL_ICON_NAME,
  colors,
  effects,
  fontSize,
  fontWeight,
  parallax,
  sizes,
  spacing,
} from '../../core';
import { BackButton } from './back-button';
import { HeroImage } from './hero-image';
import { TypeBadge } from './type-badge';

interface PokemonHeroProps {
  number: string;
  name: string;
  types: string[];
  imageUrl: string;
  shinyImageUrl: string;
  gradientColors: [string, string];
  scrollY: SharedValue<number>;
  onBack: () => void;
}

// Encabezado con degradado, número, nombre y tipos en blanco, marca de agua e imagen; con parallax al hacer scroll.
export const PokemonHero = ({
  number,
  name,
  types,
  imageUrl,
  shinyImageUrl,
  gradientColors,
  scrollY,
  onBack,
}: PokemonHeroProps) => {
  const insets = useSafeAreaInsets();

  // El héroe baja a menor velocidad que el contenido.
  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value * parallax.heroSpeedFactor }],
  }));

  // La imagen se reduce y se desvanece conforme avanza el scroll.
  const imageStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, parallax.scrollDistance],
      [1, parallax.imageMinOpacity],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [0, parallax.scrollDistance],
          [1, parallax.imageMinScale],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={heroStyle}>
      <LinearGradient
        colors={gradientColors}
        style={[
          styles.hero,
          { paddingTop: insets.top + sizes.iconButton + spacing.lg },
        ]}>
        <MaterialIcons
          name={POKEBALL_ICON_NAME}
          size={sizes.watermark}
          color={colors.onGradient}
          style={styles.watermark}
        />
        <BackButton onPress={onBack} />
        <View style={styles.title}>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.badges}>
            {types.map(type => (
              <TypeBadge key={type} type={type} glass />
            ))}
          </View>
        </View>
        <Animated.View style={[styles.image, imageStyle]}>
          <HeroImage
            key={imageUrl}
            imageUrl={imageUrl}
            shinyImageUrl={shinyImageUrl}
          />
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hero: {
    paddingBottom: sizes.sheetOverlap + spacing.md,
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    right: -spacing.lg,
    bottom: -spacing.lg,
    opacity: effects.watermarkOpacity,
  },
  title: { paddingHorizontal: spacing.lg },
  number: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
    opacity: effects.heroNumberOpacity,
  },
  name: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  image: { alignSelf: 'center', marginTop: spacing.md },
});
