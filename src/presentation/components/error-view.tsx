import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  UI_MESSAGES,
  colors,
  fontSize,
  fontWeight,
  layout,
  radius,
  spacing,
} from '../../core';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

// Muestra un mensaje de error con un botón para reintentar.
export const ErrorView = ({ message, onRetry }: ErrorViewProps) => (
  <View style={layout.center}>
    <Text style={styles.message}>{message}</Text>
    <Pressable style={styles.button} onPress={onRetry}>
      <Text style={styles.buttonText}>{UI_MESSAGES.retry}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  message: {
    fontSize: fontSize.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.onPrimary,
  },
});
