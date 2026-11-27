import { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  SPRING_CONFIG,
  colors,
  fontSize,
  fontWeight,
  radius,
  sizes,
} from '../../core';
import { useAnimatedColor } from '../hooks';

interface TabBarProps<T extends string> {
  tabs: readonly T[];
  labels: Record<T, string>;
  selected: T;
  onSelect: (tab: T) => void;
  color: string;
}

// Control segmentado con un indicador animado que se desliza hasta la pestaña elegida.
export const TabBar = <T extends string>({
  tabs,
  labels,
  selected,
  onSelect,
  color,
}: TabBarProps<T>) => {
  const [width, setWidth] = useState(0);
  const offset = useSharedValue(0);
  const tabWidth =
    Math.max(width - sizes.tabIndicatorInset * 2, 0) / tabs.length;

  // Lleva el indicador a la pestaña elegida.
  useEffect(() => {
    offset.value = withSpring(tabs.indexOf(selected) * tabWidth, SPRING_CONFIG);
  }, [offset, selected, tabWidth, tabs]);

  const colorStyle = useAnimatedColor(color);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  // Guarda el ancho disponible para repartirlo entre las pestañas.
  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) =>
    setWidth(nativeEvent.layout.width);

  return (
    <View style={styles.bar} onLayout={handleLayout}>
      <Animated.View
        style={[
          styles.indicator,
          { width: tabWidth },
          colorStyle,
          indicatorStyle,
        ]}
      />
      {tabs.map(tab => (
        <Pressable
          key={tab}
          accessibilityRole="tab"
          accessibilityState={{ selected: tab === selected }}
          onPress={() => onSelect(tab)}
          style={styles.tab}>
          <Text
            numberOfLines={1}
            style={[styles.label, tab === selected && styles.labelActive]}>
            {labels[tab]}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: sizes.tabBarHeight,
    padding: sizes.tabIndicatorInset,
    borderRadius: radius.full,
    backgroundColor: colors.background,
  },
  indicator: {
    position: 'absolute',
    top: sizes.tabIndicatorInset,
    left: sizes.tabIndicatorInset,
    bottom: sizes.tabIndicatorInset,
    borderRadius: radius.full,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.textSecondary,
  },
  labelActive: { color: colors.onGradient },
});
