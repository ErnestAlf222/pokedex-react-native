import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HERO_FLOAT_DURATION_MS,
  INFINITE_REPETITIONS,
  POKEBALL_ICON_NAME,
  colors,
  effects,
  radius,
  sizes,
  spacing,
} from '../../core';
import { BackButton } from './back-button';

interface PokemonHeroProps {
  imageUrl: string;
  gradientColors: [string, string];
  onBack: () => void;
}

// Encabezado con gradiente, marca de agua, imagen flotante y botón de volver.
export const PokemonHero = ({
  imageUrl,
  gradientColors,
  onBack,
}: PokemonHeroProps) => {
  const insets = useSafeAreaInsets();
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-sizes.floatDistance, {
        duration: HERO_FLOAT_DURATION_MS,
        easing: Easing.inOut(Easing.ease),
      }),
      INFINITE_REPETITIONS,
      true,
    );
  }, [offset]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <LinearGradient
      colors={gradientColors}
      style={[styles.hero, { paddingTop: insets.top + spacing.md }]}>
      <MaterialIcons
        name={POKEBALL_ICON_NAME}
        size={sizes.watermark}
        color={colors.onGradient}
        style={styles.watermark}
      />
      <BackButton onPress={onBack} />
      <Animated.Image
        source={{ uri: imageUrl }}
        style={[styles.image, floatStyle]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    right: -spacing.lg,
    bottom: -spacing.lg,
    opacity: effects.watermarkOpacity,
  },
  image: { width: sizes.heroImage, height: sizes.heroImage },
});
