import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  CLEAR_ICON_NAME,
  SEARCH_CLEAR_FADE_MS,
  SEARCH_ICON_NAME,
  UI_MESSAGES,
  colors,
  fontSize,
  layout,
  radius,
  shadows,
  sizes,
  spacing,
} from '../../core';
import { useAnimatedColor } from '../hooks';
import { IconCircle } from './icon-circle';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
}

// Barra de búsqueda alta y en píldora: lupa en círculo de marca, borde que anima a color de marca al enfocar y botón de limpiar con fade; "buscar" cierra el teclado.
export const SearchBar = ({ value, onChangeText, onFocus }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderStyle = useAnimatedColor(
    isFocused ? colors.primary : colors.border,
    'borderColor',
  );

  // Marca el foco y avisa a quien lo necesite.
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  // Cierra el teclado y quita el foco visual (el borde vuelve a su color) al elegir "buscar".
  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  return (
    <Animated.View style={[styles.container, borderStyle]}>
      <IconCircle icon={SEARCH_ICON_NAME} color={colors.primary} small />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSubmit}
        placeholder={UI_MESSAGES.searchPlaceholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
        submitBehavior="blurAndSubmit"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value !== '' && (
        <Animated.View
          entering={FadeIn.duration(SEARCH_CLEAR_FADE_MS)}
          exiting={FadeOut.duration(SEARCH_CLEAR_FADE_MS)}>
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
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes.searchBarHeight,
    marginHorizontal: spacing.md,
    marginTop: layout.listHeader.searchTop,
    paddingLeft: spacing.sm,
    paddingRight: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radius.full,
    borderWidth: sizes.searchBorder,
    borderColor: colors.border,
    ...shadows.soft,
  },
  input: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    padding: 0,
  },
});
