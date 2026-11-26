import { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Line, Polygon, Text as SvgText } from 'react-native-svg';
import {
  MAX_STAT_VALUE,
  RADAR_GROW_DURATION_MS,
  RADAR_LEVELS,
  STAT_LABELS,
  colors,
  effects,
  fontSize,
  fontWeight,
  formatSlug,
  getRadarAnchor,
  getRadarPoint,
  getRadarPoints,
  getRadarRing,
  sizes,
  toSvgPoints,
  withAlpha,
} from '../../core';
import { PokemonStat } from '../../domain';

interface StatsRadarProps {
  stats: PokemonStat[];
  color: string;
}

const CENTER = sizes.radarSize / 2;
const LABEL_DISTANCE = sizes.radarRadius + sizes.radarLabelOffset;
const LABEL_VERTICAL_SHIFT = '0.35em';
const VIEW_HEIGHT = sizes.radarSize - sizes.radarVerticalCrop * 2;
const VIEW_BOX = `0 ${sizes.radarVerticalCrop} ${sizes.radarSize} ${VIEW_HEIGHT}`;

// Lienzo SVG común a la rejilla y al polígono de valores.
const RadarCanvas = ({ children }: { children: ReactNode }) => (
  <Svg width="100%" height="100%" viewBox={VIEW_BOX}>
    {children}
  </Svg>
);

// Gráfico de radar de los stats: rejilla, ejes y etiquetas fijos, y el polígono de valores que crece desde el centro al abrirse.
export const StatsRadar = ({ stats, color }: StatsRadarProps) => {
  const count = stats.length;
  const values = stats.map(({ value }) => value);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: RADAR_GROW_DURATION_MS,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const growStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          effects.radarStartScale +
          (1 - effects.radarStartScale) * progress.value,
      },
    ],
  }));

  return (
    <View style={styles.box}>
      <RadarCanvas>
        {Array.from({ length: RADAR_LEVELS }, (_, level) => (
          <Polygon
            key={level}
            points={toSvgPoints(
              getRadarRing(
                count,
                (sizes.radarRadius * (level + 1)) / RADAR_LEVELS,
                CENTER,
              ),
            )}
            fill="none"
            stroke={colors.border}
            strokeWidth={sizes.radarGridStrokeWidth}
          />
        ))}
        {stats.map(({ name }, index) => {
          const edge = getRadarPoint(index, count, sizes.radarRadius, CENTER);
          const label = getRadarPoint(index, count, LABEL_DISTANCE, CENTER);
          return (
            <G key={name}>
              <Line
                x1={CENTER}
                y1={CENTER}
                x2={edge.x}
                y2={edge.y}
                stroke={colors.border}
                strokeWidth={sizes.radarGridStrokeWidth}
              />
              <SvgText
                x={label.x}
                y={label.y}
                dy={LABEL_VERTICAL_SHIFT}
                textAnchor={getRadarAnchor(label.x, CENTER)}
                fontSize={fontSize.caption}
                fontWeight={fontWeight.bold}
                fill={colors.textSecondary}>
                {STAT_LABELS[name] ?? formatSlug(name)}
              </SvgText>
            </G>
          );
        })}
      </RadarCanvas>
      <Animated.View style={[StyleSheet.absoluteFill, growStyle]}>
        <RadarCanvas>
          <Polygon
            points={toSvgPoints(
              getRadarPoints(values, MAX_STAT_VALUE, sizes.radarRadius, CENTER),
            )}
            fill={withAlpha(color, effects.radarFillOpacity)}
            stroke={color}
            strokeWidth={sizes.radarStrokeWidth}
          />
        </RadarCanvas>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { width: '100%', aspectRatio: sizes.radarSize / VIEW_HEIGHT },
});
