import { useEffect } from 'react';
import { LayoutChangeEvent, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  SPRING_CONFIG,
  effects,
  fontSize,
  fontWeight,
  getChipAppearance,
  getChipIcon,
  getChipLabel,
  radius,
  sizes,
  spacing,
} from '../../core';
import { IconCircle } from './icon-circle';
import { PressableScale } from './pressable-scale';

interface TypeFilterChipProps {
  type: string;
  isActive: boolean;
  onPress: (type: string) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

// Chip de filtro (sirve para "Todos" y para cada tipo): ícono y etiqueta; seleccionado se rellena y crece con resorte, y al presionar se encoge.
export const TypeFilterChip = ({
  type,
  isActive,
  onPress,
  onLayout,
}: TypeFilterChipProps) => {
  const appearance = getChipAppearance(type, isActive);
  const scale = useSharedValue(isActive ? effects.chipSelectedScale : 1);

  // Anima la escala del chip cuando cambia su selección.
  useEffect(() => {
    scale.value = withSpring(
      isActive ? effects.chipSelectedScale : 1,
      SPRING_CONFIG,
    );
  }, [isActive, scale]);

  const selectedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View onLayout={onLayout} style={selectedStyle}>
      <PressableScale
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
        scaleTo={effects.chipPressedScale}
        onPress={() => onPress(type)}
        style={[
          styles.chip,
          {
            backgroundColor: appearance.backgroundColor,
            borderColor: appearance.borderColor,
          },
        ]}>
        <IconCircle
          icon={getChipIcon(type)}
          color={appearance.iconBackground}
          small
        />
        <Text style={[styles.label, { color: appearance.labelColor }]}>
          {getChipLabel(type)}
        </Text>
      </PressableScale>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    height: sizes.chipHeight,
    paddingLeft: spacing.xs,
    paddingRight: spacing.md,
    borderRadius: radius.full,
    borderWidth: sizes.chipBorder,
  },
  label: { fontSize: fontSize.caption, fontWeight: fontWeight.bold },
});
