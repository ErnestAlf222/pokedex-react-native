import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ALL_GENERATIONS_VALUE,
  DEFAULT_SORT_ORDER,
  FILTER_SHEET_MAX_HEIGHT_RATIO,
  QueryViewState,
  SortOrder,
  UI_MESSAGES,
  colors,
  effects,
  fontSize,
  fontWeight,
  radius,
  sizes,
  spacing,
  withAlpha,
} from '../../core';
import { PokemonGeneration } from '../../domain';
import { useSheetTransition } from '../hooks';
import { GenerationOptions } from './generation-options';
import { PressableScale } from './pressable-scale';
import { SortOptions } from './sort-options';

export interface PanelFilters {
  generation: number;
  order: SortOrder;
}

interface FilterSheetProps extends PanelFilters {
  visible: boolean;
  generations: PokemonGeneration[];
  generationsState: QueryViewState;
  onApply: (filters: PanelFilters) => void;
  onClose: () => void;
}

interface ActionButtonProps {
  label: string;
  primary?: boolean;
  onPress: () => void;
}

// Botón de acción del panel: relleno de marca (primario) o tenue (secundario); la celda reparte el ancho y el botón conserva su altura.
const ActionButton = ({ label, primary = false, onPress }: ActionButtonProps) => (
  <View style={styles.actionCell}>
    <PressableScale
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.action,
        primary ? styles.actionPrimary : styles.actionSecondary,
      ]}>
      <Text style={[styles.actionLabel, primary && styles.actionLabelPrimary]}>
        {label}
      </Text>
    </PressableScale>
  </View>
);

// Panel inferior de filtros (generación y orden): fondo oscurecido que cierra al tocar, asa, secciones y botones Limpiar y Aplicar.
export const FilterSheet = ({
  visible,
  generation,
  order,
  generations,
  generationsState,
  onApply,
  onClose,
}: FilterSheetProps) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { mounted, backdropStyle, sheetStyle } = useSheetTransition(visible);
  const [draftGeneration, setDraftGeneration] = useState(generation);
  const [draftOrder, setDraftOrder] = useState(order);

  // Al abrir, el borrador parte de los filtros aplicados.
  useEffect(() => {
    if (visible) {
      setDraftGeneration(generation);
      setDraftOrder(order);
    }
  }, [visible, generation, order]);

  // Deja el borrador sin filtros.
  const clearDraft = () => {
    setDraftGeneration(ALL_GENERATIONS_VALUE);
    setDraftOrder(DEFAULT_SORT_ORDER);
  };

  // Aplica el borrador y cierra el panel.
  const apply = () => {
    onApply({ generation: draftGeneration, order: draftOrder });
    onClose();
  };

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}>
          <Pressable
            accessibilityLabel={UI_MESSAGES.closeFilters}
            style={StyleSheet.absoluteFill}
            onPress={onClose}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.sheet,
            {
              maxHeight: height * FILTER_SHEET_MAX_HEIGHT_RATIO,
              paddingBottom: insets.bottom + spacing.md,
            },
            sheetStyle,
          ]}>
          <View style={styles.handle} />
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <GenerationOptions
              generations={generations}
              state={generationsState}
              selected={draftGeneration}
              onSelect={setDraftGeneration}
            />
            <SortOptions selected={draftOrder} onSelect={setDraftOrder} />
          </ScrollView>
          <View style={styles.actions}>
            <ActionButton label={UI_MESSAGES.clearFilters} onPress={clearDraft} />
            <ActionButton label={UI_MESSAGES.applyFilters} primary onPress={apply} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: colors.textPrimary },
  sheet: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: colors.background,
  },
  handle: {
    alignSelf: 'center',
    width: sizes.sheetHandleWidth,
    height: sizes.sheetHandleHeight,
    borderRadius: radius.full,
    backgroundColor: colors.border,
  },
  scroll: { flexShrink: 1, marginHorizontal: -spacing.xs },
  scrollContent: { padding: spacing.xs },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  actionCell: { flex: 1 },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.searchBarHeight - spacing.sm,
    borderRadius: radius.full,
  },
  actionPrimary: { backgroundColor: colors.primary },
  actionSecondary: { backgroundColor: withAlpha(colors.textPrimary, effects.chipInactiveOpacity) },
  actionLabel: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  actionLabelPrimary: { color: colors.onPrimary },
});
