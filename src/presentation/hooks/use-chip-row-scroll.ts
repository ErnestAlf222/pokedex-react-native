import { useEffect, useRef } from 'react';
import { LayoutChangeEvent, ScrollViewInstance } from 'react-native';
import { getChipScrollOffset } from '../../core';

interface ChipLayout {
  x: number;
  width: number;
}

// Mide la fila de chips y, al cambiar el chip seleccionado, la desplaza para dejarlo centrado y visible.
export const useChipRowScroll = (selected: string) => {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const viewportWidth = useRef(0);
  const layouts = useRef(new Map<string, ChipLayout>());

  // Guarda el ancho visible de la fila.
  const onViewportLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    viewportWidth.current = nativeEvent.layout.width;
  };

  // Devuelve un manejador que guarda la posición y el ancho del chip de ese tipo.
  const onChipLayout =
    (type: string) =>
    ({ nativeEvent }: LayoutChangeEvent) => {
      const { x, width } = nativeEvent.layout;
      layouts.current.set(type, { x, width });
    };

  // Desplaza la fila al chip seleccionado cuando cambia la selección.
  useEffect(() => {
    const layout = layouts.current.get(selected);
    if (layout !== undefined) {
      scrollRef.current?.scrollTo({
        x: getChipScrollOffset(layout.x, layout.width, viewportWidth.current),
        animated: true,
      });
    }
  }, [selected]);

  return { scrollRef, onViewportLayout, onChipLayout };
};
