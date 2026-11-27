import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, View } from 'react-native';
import {
  colors,
  getTypeColor,
  getTypeIcon,
  getTypeLabel,
  sizes,
} from '../../core';

interface TypeIconProps {
  type: string;
  small?: boolean;
}

// Círculo del color del tipo con su ícono; grande para la matriz de efectividad y pequeño para las tarjetas de movimientos.
export const TypeIcon = ({ type, small = false }: TypeIconProps) => (
  <View
    accessibilityLabel={getTypeLabel(type)}
    style={[
      styles.circle,
      small && styles.circleSmall,
      { backgroundColor: getTypeColor(type) },
    ]}>
    <MaterialIcons
      name={getTypeIcon(type)}
      size={small ? sizes.typeGlyphSmall : sizes.typeGlyph}
      color={colors.onGradient}
    />
  </View>
);

const styles = StyleSheet.create({
  circle: {
    width: sizes.typeCircle,
    height: sizes.typeCircle,
    borderRadius: sizes.typeCircle / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSmall: {
    width: sizes.typeCircleSmall,
    height: sizes.typeCircleSmall,
    borderRadius: sizes.typeCircleSmall / 2,
  },
});
