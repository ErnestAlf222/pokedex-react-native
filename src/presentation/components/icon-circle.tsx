import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { getReadableTextColor, sizes } from '../../core';

export type IconName = ComponentProps<typeof MaterialIcons>['name'];

interface IconCircleProps {
  icon: IconName;
  color: string;
  glyphColor?: string;
  small?: boolean;
  accessibilityLabel?: string;
}

// Círculo de color con un ícono; el ícono se ve claro u oscuro según el fondo (o con el color indicado). Base de TypeIcon y de los chips.
export const IconCircle = ({
  icon,
  color,
  glyphColor,
  small = false,
  accessibilityLabel,
}: IconCircleProps) => (
  <View
    accessibilityLabel={accessibilityLabel}
    style={[
      styles.circle,
      small && styles.circleSmall,
      { backgroundColor: color },
    ]}>
    <MaterialIcons
      name={icon}
      size={small ? sizes.typeGlyphSmall : sizes.typeGlyph}
      color={glyphColor ?? getReadableTextColor(color)}
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
