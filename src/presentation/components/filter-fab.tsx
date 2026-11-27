import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FAB_ENTRY_DELAY_MS,
  FILTER_ICON_NAME,
  UI_MESSAGES,
  colors,
  effects,
  fontSize,
  fontWeight,
  shadows,
  sizes,
  spacing,
} from '../../core';
import { useSpringEntrance } from '../hooks';
import { PressableScale } from './pressable-scale';

interface FilterFabProps {
  count: number;
  onPress: () => void;
}

// Botón flotante de filtros (abajo a la derecha): entra con resorte, responde al toque y muestra una insignia con los filtros activos (oculta si no hay).
export const FilterFab = ({ count, onPress }: FilterFabProps) => {
  const insets = useSafeAreaInsets();
  const entrance = useSpringEntrance({
    delayMs: FAB_ENTRY_DELAY_MS,
    distance: sizes.fabEntryDistance,
    scaleFrom: effects.entryScaleFrom,
  });

  return (
    <Animated.View
      style={[styles.fab, { bottom: insets.bottom + spacing.md }, entrance]}>
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={UI_MESSAGES.filters}
        onPress={onPress}
        style={styles.press}>
        <MaterialIcons
          name={FILTER_ICON_NAME}
          size={sizes.fabIcon}
          color={colors.onPrimary}
        />
      </PressableScale>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>{count}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: spacing.md,
    width: sizes.fabSize,
    height: sizes.fabSize,
    borderRadius: sizes.fabSize / 2,
    backgroundColor: colors.primary,
    ...shadows.soft,
  },
  press: {
    width: sizes.fabSize,
    height: sizes.fabSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -spacing.xs,
    right: -spacing.xs,
    minWidth: sizes.fabBadge,
    height: sizes.fabBadge,
    borderRadius: sizes.fabBadge / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.textPrimary,
  },
  badgeLabel: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
});
