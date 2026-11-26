import { StyleSheet, Text, View } from 'react-native';
import { UI_MESSAGES, colors, fontSize, layout } from '../../core';

// Mensaje centrado para cuando no hay Pokémon que mostrar.
export const EmptyView = () => (
  <View style={layout.center}>
    <Text style={styles.message}>{UI_MESSAGES.empty}</Text>
  </View>
);

const styles = StyleSheet.create({
  message: { fontSize: fontSize.body, color: colors.textSecondary },
});
