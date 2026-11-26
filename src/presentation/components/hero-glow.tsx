import { StyleSheet } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { HERO_GLOW_ID, effects, sizes } from '../../core';

interface HeroGlowProps {
  color: string;
}

const CENTER = '50%';

// Brillo radial suave detrás del artwork, en un tono claro del color del tipo.
export const HeroGlow = ({ color }: HeroGlowProps) => (
  <Svg
    width={sizes.heroGlow}
    height={sizes.heroGlow}
    style={styles.glow}
    pointerEvents="none">
    <Defs>
      <RadialGradient id={HERO_GLOW_ID} cx={CENTER} cy={CENTER} r={CENTER}>
        <Stop
          offset="0"
          stopColor={color}
          stopOpacity={effects.heroGlowOpacity}
        />
        <Stop offset="1" stopColor={color} stopOpacity={0} />
      </RadialGradient>
    </Defs>
    <Circle cx={CENTER} cy={CENTER} r={CENTER} fill={`url(#${HERO_GLOW_ID})`} />
  </Svg>
);

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    top: -(sizes.heroGlow - sizes.heroImage) / 2,
    left: -(sizes.heroGlow - sizes.heroImage) / 2,
  },
});
