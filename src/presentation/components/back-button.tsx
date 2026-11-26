import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BACK_ICON_NAME,
  UI_MESSAGES,
  colors,
  radius,
  sizes,
  spacing,
} from '../../core';

interface BackButtonProps {
  onPress: () => void;
}

// Botón circular de volver, posicionado bajo la barra de estado.
export const BackButton = ({ onPress }: BackButtonProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      accessibilityLabel={UI_MESSAGES.back}
      onPress={onPress}
      style={[styles.button, { top: insets.top + spacing.sm }]}>
      <MaterialIcons
        name={BACK_ICON_NAME}
        size={sizes.backIcon}
        color={colors.onGradient}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: spacing.md,
    width: sizes.iconButton,
    height: sizes.iconButton,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.translucent,
  },
});
