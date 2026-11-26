import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import {
  CLEAR_ICON_NAME,
  SEARCH_ICON_NAME,
  UI_MESSAGES,
  colors,
  fontSize,
  radius,
  sizes,
  spacing,
} from '../../core';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
}

// Barra de búsqueda con lupa y un botón para limpiar que aparece solo con texto.
export const SearchBar = ({ value, onChangeText, onFocus }: SearchBarProps) => (
  <View style={styles.container}>
    <MaterialIcons
      name={SEARCH_ICON_NAME}
      size={sizes.searchIcon}
      color={colors.textSecondary}
    />
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      placeholder={UI_MESSAGES.searchPlaceholder}
      placeholderTextColor={colors.textSecondary}
      returnKeyType="search"
      autoCorrect={false}
      autoCapitalize="none"
    />
    {value !== '' && (
      <Pressable
        accessibilityLabel={UI_MESSAGES.clearSearch}
        hitSlop={spacing.sm}
        onPress={() => onChangeText('')}>
        <MaterialIcons
          name={CLEAR_ICON_NAME}
          size={sizes.searchIcon}
          color={colors.textSecondary}
        />
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes.searchBarHeight,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.full,
  },
  input: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    padding: 0,
  },
});
