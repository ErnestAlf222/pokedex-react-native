import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  ARTWORK_ENTRY_DELAY_MS,
  TITLE_ENTRY_DELAY_MS,
  TITLE_ENTRY_STAGGER_MS,
  colors,
  effects,
  fontSize,
  fontWeight,
  lightenColor,
  parallax,
  sizes,
  spacing,
} from '../../core';
import { useHeroFloat, useSpringEntrance } from '../hooks';
import { HeroGlow } from './hero-glow';
import { HeroImage } from './hero-image';
import { HeroShadow } from './hero-shadow';
import { TypeBadge } from './type-badge';

interface HeroContentProps {
  number: string;
  name: string;
  types: string[];
  imageUrl: string;
  shinyImageUrl: string;
  typeColor: string;
  scrollY: SharedValue<number>;
}

// Contenido del héroe: número, nombre y tipos entran escalonados, y el artwork con resorte sobre su brillo y su sombra.
export const HeroContent = ({
  number,
  name,
  types,
  imageUrl,
  shinyImageUrl,
  typeColor,
  scrollY,
}: HeroContentProps) => {
  const floatOffset = useHeroFloat();
  const artworkEntrance = useSpringEntrance({
    delayMs: ARTWORK_ENTRY_DELAY_MS,
    distance: sizes.entryDistance,
    scaleFrom: effects.entryScaleFrom,
  });
  const numberEntrance = useSpringEntrance({
    delayMs: TITLE_ENTRY_DELAY_MS,
    distance: sizes.entryDistance,
  });
  const nameEntrance = useSpringEntrance({
    delayMs: TITLE_ENTRY_DELAY_MS + TITLE_ENTRY_STAGGER_MS,
    distance: sizes.entryDistance,
  });
  const badgesEntrance = useSpringEntrance({
    delayMs: TITLE_ENTRY_DELAY_MS + TITLE_ENTRY_STAGGER_MS * 2,
    distance: sizes.entryDistance,
  });

  // La imagen se reduce y se desvanece conforme avanza el scroll.
  const parallaxStyle = useAnimatedStyle(() => ({
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
    <>
      <View style={styles.title}>
        <Animated.Text style={[styles.number, numberEntrance]}>
          {number}
        </Animated.Text>
        <Animated.Text style={[styles.name, nameEntrance]}>
          {name}
        </Animated.Text>
        <Animated.View style={[styles.badges, badgesEntrance]}>
          {types.map(type => (
            <TypeBadge key={type} type={type} glass />
          ))}
        </Animated.View>
      </View>
      <Animated.View style={[styles.image, parallaxStyle]}>
        <Animated.View style={artworkEntrance}>
          <HeroGlow
            color={lightenColor(typeColor, effects.glowLightenFactor)}
          />
          <HeroImage
            imageUrl={imageUrl}
            shinyImageUrl={shinyImageUrl}
            floatOffset={floatOffset}
          />
          <HeroShadow floatOffset={floatOffset} />
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: 'flex-start',
  },
  image: { alignSelf: 'center', marginTop: spacing.md },
});
