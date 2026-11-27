import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, sizes } from '../../core';

interface IconCircleProps {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  color: string;
  small?: boolean;
  accessibilityLabel?: string;
}

// Círculo de color con un ícono blanco; grande o pequeño. Base de TypeIcon y de los chips de filtro.
export const IconCircle = ({
  icon,
  color,
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
