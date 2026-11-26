import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  POKEBALL_ICON_NAME,
  colors,
  effects,
  radius,
  sizes,
  spacing,
} from '../../core';
import { BackButton } from './back-button';
import { HeroImage } from './hero-image';

interface PokemonHeroProps {
  imageUrl: string;
  shinyImageUrl: string;
  gradientColors: [string, string];
  onBack: () => void;
}

// Encabezado con gradiente, marca de agua, imagen interactiva y botón de volver.
export const PokemonHero = ({
  imageUrl,
  shinyImageUrl,
  gradientColors,
  onBack,
}: PokemonHeroProps) => {
  const insets = useSafeAreaInsets();

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
      <HeroImage
        key={imageUrl}
        imageUrl={imageUrl}
        shinyImageUrl={shinyImageUrl}
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
});
