import { StyleSheet, Text, View } from 'react-native';
import { UI_MESSAGES, colors, fontSize, layout } from '../../core';

interface EmptyViewProps {
  message?: string;
}

// Mensaje para cuando no hay Pokémon que mostrar, alineado arriba para que el teclado no lo tape.
export const EmptyView = ({ message = UI_MESSAGES.empty }: EmptyViewProps) => (
  <View style={layout.emptyTop}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  message: { fontSize: fontSize.body, color: colors.textSecondary },
});
