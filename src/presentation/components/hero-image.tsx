import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  FULL_TURN_DEGREES,
  HALF_TURN_DEGREES,
  HERO_FLIP_DURATION_MS,
  sizes,
  vibrate,
} from '../../core';

interface HeroImageProps {
  imageUrl: string;
  shinyImageUrl: string;
  floatOffset: SharedValue<number>;
}

// Imagen del héroe que flota (valor compartido con su sombra) y, al tocarla, gira 360° alternando con su versión shiny.
export const HeroImage = ({
  imageUrl,
  shinyImageUrl,
  floatOffset,
}: HeroImageProps) => {
  const [showShiny, setShowShiny] = useState(false);
  const rotation = useSharedValue(0);

  // Alterna entre la imagen normal y la shiny.
  const toggleShiny = () => setShowShiny(previous => !previous);

  // Cambia la imagen justo cuando el giro cruza la mitad (cara oculta).
  useAnimatedReaction(
    () => rotation.value >= HALF_TURN_DEGREES,
    (isPastHalf, wasPastHalf) => {
      if (isPastHalf && !wasPastHalf) {
        scheduleOnRN(toggleShiny);
      }
    },
  );

  // Inicia el giro completo con una vibración corta, ignorando toques mientras ya está girando.
  const flip = () => {
    if (rotation.value > 0 && rotation.value < FULL_TURN_DEGREES) {
      return;
    }
    vibrate();
    rotation.value = 0;
    rotation.value = withTiming(FULL_TURN_DEGREES, {
      duration: HERO_FLIP_DURATION_MS,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: sizes.heroPerspective },
      { translateY: floatOffset.value },
      { rotateY: `${rotation.value}deg` },
    ],
  }));

  return (
    <Pressable onPress={flip} style={styles.box}>
      <Animated.Image
        source={{ uri: showShiny ? shinyImageUrl : imageUrl }}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: { width: sizes.heroImage, height: sizes.heroImage },
  image: { width: '100%', height: '100%' },
});
