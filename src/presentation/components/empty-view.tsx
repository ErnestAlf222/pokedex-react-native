import { StyleSheet, Text, View } from 'react-native';
import { UI_MESSAGES, colors, fontSize, layout } from '../../core';

interface EmptyViewProps {
  message?: string;
}

// Mensaje centrado para cuando no hay Pokémon que mostrar.
export const EmptyView = ({ message = UI_MESSAGES.empty }: EmptyViewProps) => (
  <View style={layout.center}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  message: { fontSize: fontSize.body, color: colors.textSecondary },
});
