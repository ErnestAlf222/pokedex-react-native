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
  getColorChipAppearance,
  radius,
  sizes,
  spacing,
} from '../../core';
import { IconCircle, IconName } from './icon-circle';
import { PressableScale } from './pressable-scale';

interface FilterChipProps {
  label: string;
  color: string;
  isActive: boolean;
  icon?: IconName;
  onPress: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

// Chip de filtro común (tipos, generaciones y orden): etiqueta e ícono opcional; seleccionado se rellena y crece con resorte, y al presionar se encoge.
export const FilterChip = ({
  label,
  color,
  isActive,
  icon,
  onPress,
  onLayout,
}: FilterChipProps) => {
  const appearance = getColorChipAppearance(color, isActive);
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
        onPress={onPress}
        style={[
          styles.chip,
          icon === undefined && styles.chipWithoutIcon,
          {
            backgroundColor: appearance.backgroundColor,
            borderColor: appearance.borderColor,
          },
        ]}>
        {icon !== undefined && (
          <IconCircle
            icon={icon}
            color={appearance.iconBackground}
            glyphColor={appearance.iconColor}
            small
          />
        )}
        <Text style={[styles.label, { color: appearance.labelColor }]}>
          {label}
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
  chipWithoutIcon: { paddingLeft: spacing.md },
  label: { fontSize: fontSize.caption, fontWeight: fontWeight.bold },
});
