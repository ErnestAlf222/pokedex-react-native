import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
  BACK_ICON_NAME,
  HERO_FLOAT_DURATION_MS,
  INFINITE_REPETITIONS,
  POKEBALL_ICON_NAME,
  UI_MESSAGES,
  colors,
  effects,
  radius,
  sizes,
  spacing,
} from '../../core';

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
      <Pressable
        accessibilityLabel={UI_MESSAGES.back}
        onPress={onBack}
        style={[styles.backButton, { top: insets.top + spacing.sm }]}>
        <MaterialIcons
          name={BACK_ICON_NAME}
          size={sizes.backIcon}
          color={colors.onGradient}
        />
      </Pressable>
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
  backButton: {
    position: 'absolute',
    left: spacing.md,
    width: sizes.iconButton,
    height: sizes.iconButton,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.translucent,
  },
  image: { width: sizes.heroImage, height: sizes.heroImage },
});
