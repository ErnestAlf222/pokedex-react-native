import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  FULL_TURN_DEGREES,
  HALF_TURN_DEGREES,
  HERO_FLIP_DURATION_MS,
  HERO_FLOAT_DURATION_MS,
  INFINITE_REPETITIONS,
  sizes,
} from '../../core';

interface HeroImageProps {
  imageUrl: string;
  spriteBack: string | null;
}

// Imagen del héroe que flota y, al tocarla, gira 360° alternando con el sprite de espalda.
export const HeroImage = ({ imageUrl, spriteBack }: HeroImageProps) => {
  const [showBack, setShowBack] = useState(false);
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);

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

  // Alterna la imagen mostrada, solo si existe el sprite de espalda.
  const toggleSprite = () => {
    if (spriteBack) {
      setShowBack(previous => !previous);
    }
  };

  // Cambia la imagen justo cuando el giro cruza la mitad (cara oculta).
  useAnimatedReaction(
    () => rotation.value >= HALF_TURN_DEGREES,
    (isPastHalf, wasPastHalf) => {
      if (isPastHalf && !wasPastHalf) {
        scheduleOnRN(toggleSprite);
      }
    },
  );

  // Inicia el giro completo, ignorando toques mientras ya está girando.
  const flip = () => {
    if (rotation.value > 0 && rotation.value < FULL_TURN_DEGREES) {
      return;
    }
    rotation.value = 0;
    rotation.value = withTiming(FULL_TURN_DEGREES, {
      duration: HERO_FLIP_DURATION_MS,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: sizes.heroPerspective },
      { translateY: offset.value },
      { rotateY: `${rotation.value}deg` },
    ],
  }));

  return (
    <Pressable onPress={flip} style={styles.box}>
      <Animated.Image
        source={{ uri: showBack && spriteBack ? spriteBack : imageUrl }}
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
