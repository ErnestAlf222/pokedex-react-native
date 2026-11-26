import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';
import { HERO_SHADOW_ID, colors, effects, sizes } from '../../core';

interface HeroShadowProps {
  floatOffset: SharedValue<number>;
}

const CENTER = '50%';

// Sombra elíptica en el suelo: se encoge y aclara cuando el artwork sube y crece cuando baja, según su flotado.
export const HeroShadow = ({ floatOffset }: HeroShadowProps) => {
  const shadowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      floatOffset.value,
      [-sizes.floatDistance, 0],
      [effects.heroShadowMinOpacity, 1],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        scaleX: interpolate(
          floatOffset.value,
          [-sizes.floatDistance, 0],
          [effects.heroShadowMinScale, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.shadow, shadowStyle]} pointerEvents="none">
      <Svg width={sizes.heroShadowWidth} height={sizes.heroShadowHeight}>
        <Defs>
          <RadialGradient
            id={HERO_SHADOW_ID}
            cx={CENTER}
            cy={CENTER}
            r={CENTER}>
            <Stop
              offset="0"
              stopColor={colors.textPrimary}
              stopOpacity={effects.heroShadowOpacity}
            />
            <Stop offset="1" stopColor={colors.textPrimary} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Ellipse
          cx={CENTER}
          cy={CENTER}
          rx={CENTER}
          ry={CENTER}
          fill={`url(#${HERO_SHADOW_ID})`}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    alignSelf: 'center',
    marginTop: -sizes.heroShadowOverlap,
  },
});
