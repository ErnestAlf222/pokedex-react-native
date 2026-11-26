import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  colors,
  effects,
  fontSize,
  fontWeight,
  parallax,
  shadows,
  sizes,
  spacing,
} from '../../core';
import { useAnimatedColor } from '../hooks';
import { BackButton } from './back-button';

interface CompactBarProps {
  name: string;
  number: string;
  gradientColors: [string, string];
  scrollY: SharedValue<number>;
  onBack: () => void;
}

const FADE_END = parallax.compactBarThreshold + parallax.compactBarFadeRange;

// Barra superior fija: al colapsar el héroe aparece con fade y desplazamiento, en el color del tipo; el botón de volver siempre está accesible.
export const CompactBar = ({
  name,
  number,
  gradientColors,
  scrollY,
  onBack,
}: CompactBarProps) => {
  const insets = useSafeAreaInsets();
  const topColorStyle = useAnimatedColor(gradientColors[0]);

  const barStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [parallax.compactBarThreshold, FADE_END],
      [0, 1],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [parallax.compactBarThreshold, FADE_END],
          [-parallax.compactBarShift, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bar,
          {
            height: insets.top + sizes.compactBarHeight,
            paddingTop: insets.top,
          },
          topColorStyle,
          barStyle,
        ]}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.number}>{number}</Text>
      </Animated.View>
      <BackButton onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 0, left: 0, right: 0 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: sizes.iconButton + spacing.lg,
    ...shadows.card,
  },
  name: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
  number: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
    opacity: effects.heroNumberOpacity,
  },
});
