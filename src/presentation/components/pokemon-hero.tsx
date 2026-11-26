import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  POKEBALL_ICON_NAME,
  colors,
  effects,
  parallax,
  sizes,
  spacing,
} from '../../core';
import { useGradientCrossfade } from '../hooks';
import { HeroContent } from './hero-content';

interface PokemonHeroProps {
  number: string;
  name: string;
  types: string[];
  imageUrl: string;
  shinyImageUrl: string;
  gradientColors: [string, string];
  scrollY: SharedValue<number>;
}

// Encabezado con degradado que se funde entre Pokémon, marca de agua y contenido; baja a menor velocidad que el scroll (parallax).
export const PokemonHero = ({
  number,
  name,
  types,
  imageUrl,
  shinyImageUrl,
  gradientColors,
  scrollY,
}: PokemonHeroProps) => {
  const insets = useSafeAreaInsets();
  const { previous, previousStyle } = useGradientCrossfade(gradientColors);

  // El héroe baja a menor velocidad que el contenido.
  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value * parallax.heroSpeedFactor }],
  }));

  return (
    <Animated.View style={heroStyle}>
      <View
        style={[
          styles.hero,
          { paddingTop: insets.top + sizes.iconButton + spacing.lg },
        ]}>
        <LinearGradient
          colors={gradientColors}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, previousStyle]}>
          <LinearGradient colors={previous} style={StyleSheet.absoluteFill} />
        </Animated.View>
        <MaterialIcons
          name={POKEBALL_ICON_NAME}
          size={sizes.watermark}
          color={colors.onGradient}
          style={styles.watermark}
        />
        <HeroContent
          key={imageUrl}
          number={number}
          name={name}
          types={types}
          imageUrl={imageUrl}
          shinyImageUrl={shinyImageUrl}
          typeColor={gradientColors[0]}
          scrollY={scrollY}
        />
      </View>
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
});
