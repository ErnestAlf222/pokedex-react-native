import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BANNER_ANIMATION_MS,
  BANNER_RESTORED_DURATION_MS,
  UI_MESSAGES,
  colors,
  fontSize,
  fontWeight,
  sizes,
} from '../../core';
import { useNetworkStatus } from '../hooks';

type BannerVariant = 'offline' | 'restored';

const VARIANTS: Record<BannerVariant, { message: string; color: string }> = {
  offline: { message: UI_MESSAGES.offline, color: colors.error },
  restored: { message: UI_MESSAGES.backOnline, color: colors.success },
};

// Banner superior animado sobre la franja del status bar: avisa sin conexión y confirma brevemente al volver.
export const OfflineBanner = () => {
  const isOnline = useNetworkStatus();
  const insets = useSafeAreaInsets();
  const [variant, setVariant] = useState<BannerVariant>('offline');
  const [visible, setVisible] = useState(false);
  const wasOffline = useRef(false);
  const progress = useSharedValue(0);
  const height = Math.max(insets.top, sizes.bannerHeight);

  // Muestra el aviso al perder la red y, al recuperarla, el mensaje de restablecida por un rato.
  useEffect(() => {
    if (!isOnline) {
      wasOffline.current = true;
      setVariant('offline');
      setVisible(true);
      return undefined;
    }
    if (!wasOffline.current) {
      return undefined;
    }
    wasOffline.current = false;
    setVariant('restored');
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), BANNER_RESTORED_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isOnline]);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: BANNER_ANIMATION_MS,
    });
  }, [visible, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (progress.value - 1) * height }],
  }));

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      style={[
        styles.banner,
        { height, backgroundColor: VARIANTS[variant].color },
        animatedStyle,
      ]}>
      <Text style={styles.text}>{VARIANTS[variant].message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  text: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.onGradient,
  },
});
