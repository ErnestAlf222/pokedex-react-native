import { StyleSheet, View } from 'react-native';
import Svg, { G, Line, Polygon, Text as SvgText } from 'react-native-svg';
import {
  MAX_STAT_VALUE,
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

// Gráfico de radar de los stats: rejilla, ejes, polígono de valores y etiquetas, todo con react-native-svg.
export const StatsRadar = ({ stats, color }: StatsRadarProps) => {
  const count = stats.length;
  const values = stats.map(({ value }) => value);

  return (
    <View style={styles.box}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 ${sizes.radarVerticalCrop} ${sizes.radarSize} ${VIEW_HEIGHT}`}>
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
        <Polygon
          points={toSvgPoints(
            getRadarPoints(values, MAX_STAT_VALUE, sizes.radarRadius, CENTER),
          )}
          fill={withAlpha(color, effects.radarFillOpacity)}
          stroke={color}
          strokeWidth={sizes.radarStrokeWidth}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { width: '100%', aspectRatio: sizes.radarSize / VIEW_HEIGHT },
});
