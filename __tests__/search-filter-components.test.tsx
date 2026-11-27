import { Keyboard, Modal, TextInput } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import {
  ALL_GENERATIONS_VALUE,
  DEFAULT_SORT_ORDER,
  UI_MESSAGES,
} from '../src/core';
import { PokemonGeneration } from '../src/domain';
import { FilterFab, FilterSheet, SearchBar } from '../src/presentation';
import {
  allTexts,
  cleanupRenders,
  createTestQueryClient,
  pressText,
  renderWithClient,
} from '../__fixtures__/render-utils';

// Mock oficial de safe-area: los componentes leen los insets sin un SafeAreaProvider.
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

afterEach(async () => {
  jest.restoreAllMocks();
  await cleanupRenders();
});

// Pulsa el elemento con esa etiqueta de accesibilidad que tenga onPress.
const pressByLabel = (
  renderer: ReactTestRenderer.ReactTestRenderer,
  label: string,
) =>
  ReactTestRenderer.act(async () => {
    renderer.root
      .findAll(
        node =>
          node.props.accessibilityLabel === label &&
          typeof node.props.onPress === 'function',
      )[0]
      ?.props.onPress();
  });

// Indica si existe un elemento con esa etiqueta de accesibilidad.
const hasLabel = (
  renderer: ReactTestRenderer.ReactTestRenderer,
  label: string,
) =>
  renderer.root.findAll(node => node.props.accessibilityLabel === label)
    .length > 0;

const mount = (ui: React.ReactElement) =>
  renderWithClient(ui, createTestQueryClient());

// Pruebas del buscador: con y sin texto, limpiar y acción "buscar" del teclado.
describe('SearchBar', () => {
  it('sin texto no muestra el botón de limpiar', async () => {
    const renderer = await mount(
      <SearchBar value="" onChangeText={jest.fn()} />,
    );

    expect(hasLabel(renderer, UI_MESSAGES.clearSearch)).toBe(false);
  });

  it('con texto muestra el botón y al pulsarlo limpia la búsqueda', async () => {
    const onChangeText = jest.fn();
    const renderer = await mount(
      <SearchBar value="char" onChangeText={onChangeText} />,
    );

    expect(hasLabel(renderer, UI_MESSAGES.clearSearch)).toBe(true);

    await pressByLabel(renderer, UI_MESSAGES.clearSearch);

    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('avisa al enfocar y propaga lo escrito', async () => {
    const onFocus = jest.fn();
    const onChangeText = jest.fn();
    const renderer = await mount(
      <SearchBar value="" onChangeText={onChangeText} onFocus={onFocus} />,
    );
    const input = renderer.root.findByType(TextInput);

    await ReactTestRenderer.act(async () => {
      input.props.onFocus();
      input.props.onChangeText('mew');
    });

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('mew');
  });

  it('la acción "buscar" del teclado lo cierra', async () => {
    const dismiss = jest.spyOn(Keyboard, 'dismiss');
    const renderer = await mount(
      <SearchBar value="mew" onChangeText={jest.fn()} />,
    );
    const input = renderer.root.findByType(TextInput);

    await ReactTestRenderer.act(async () => {
      input.props.onSubmitEditing();
    });

    expect(input.props.returnKeyType).toBe('search');
    expect(dismiss).toHaveBeenCalled();
  });
});

// Pruebas del botón flotante: insignia con y sin filtros y respuesta al toque.
describe('FilterFab', () => {
  it('sin filtros activos oculta la insignia', async () => {
    const renderer = await mount(<FilterFab count={0} onPress={jest.fn()} />);

    expect(allTexts(renderer).filter(text => /^\d+$/.test(text))).toEqual([]);
  });

  it('con filtros activos muestra cuántos hay', async () => {
    const renderer = await mount(<FilterFab count={2} onPress={jest.fn()} />);

    expect(allTexts(renderer)).toContain('2');
  });

  it('llama a onPress al tocarlo', async () => {
    const onPress = jest.fn();
    const renderer = await mount(<FilterFab count={0} onPress={onPress} />);

    await pressByLabel(renderer, UI_MESSAGES.filters);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

const generations: PokemonGeneration[] = [
  { id: 1, name: 'Generación I', region: 'kanto' },
  { id: 2, name: 'Generación II', region: 'johto' },
];

// Monta el panel visible con los filtros iniciales indicados.
const mountSheet = async (
  props: Partial<React.ComponentProps<typeof FilterSheet>> = {},
) => {
  const onApply = jest.fn();
  const onClose = jest.fn();
  const renderer = await mount(
    <FilterSheet
      visible
      generation={ALL_GENERATIONS_VALUE}
      order={DEFAULT_SORT_ORDER}
      generations={generations}
      generationsState="content"
      onApply={onApply}
      onClose={onClose}
      {...props}
    />,
  );
  return { renderer, onApply, onClose };
};

// Pruebas del panel de filtros: opciones, aplicar, limpiar y cerrar.
describe('FilterSheet', () => {
  it('muestra "Todas", cada generación con su región y los criterios de orden', async () => {
    const { renderer } = await mountSheet();
    const texts = allTexts(renderer);

    expect(texts).toEqual(
      expect.arrayContaining([
        UI_MESSAGES.generation,
        UI_MESSAGES.allGenerations,
        'Generación I · Kanto',
        'Generación II · Johto',
        UI_MESSAGES.order,
        'Número ↑',
        'Número ↓',
        'Nombre A–Z',
        UI_MESSAGES.clearFilters,
        UI_MESSAGES.applyFilters,
      ]),
    );
  });

  it('aplica la generación y el orden elegidos y se cierra', async () => {
    const { renderer, onApply, onClose } = await mountSheet();

    await pressText(renderer, 'Generación II · Johto');
    await pressText(renderer, 'Nombre A–Z');
    await pressText(renderer, UI_MESSAGES.applyFilters);

    expect(onApply).toHaveBeenCalledWith({ generation: 2, order: 'name-asc' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('limpiar deja el borrador sin filtros', async () => {
    const { renderer, onApply } = await mountSheet({
      generation: 2,
      order: 'number-desc',
    });

    await pressText(renderer, UI_MESSAGES.clearFilters);
    await pressText(renderer, UI_MESSAGES.applyFilters);

    expect(onApply).toHaveBeenCalledWith({
      generation: ALL_GENERATIONS_VALUE,
      order: DEFAULT_SORT_ORDER,
    });
  });

  it('parte de los filtros ya aplicados', async () => {
    const { renderer, onApply } = await mountSheet({
      generation: 1,
      order: 'name-asc',
    });

    await pressText(renderer, UI_MESSAGES.applyFilters);

    expect(onApply).toHaveBeenCalledWith({ generation: 1, order: 'name-asc' });
  });

  it('cierra al tocar el fondo oscurecido', async () => {
    const { renderer, onClose } = await mountSheet();

    await pressByLabel(renderer, UI_MESSAGES.closeFilters);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('muestra un aviso si no hay generaciones sin conexión', async () => {
    const { renderer } = await mountSheet({
      generations: [],
      generationsState: 'offline',
    });

    expect(allTexts(renderer)).toContain(UI_MESSAGES.generationsUnavailable);
  });

  it('no renderiza nada cuando está cerrado', async () => {
    const { renderer } = await mountSheet({ visible: false });

    expect(allTexts(renderer)).not.toContain(UI_MESSAGES.applyFilters);
    expect(renderer.root.findAllByType(Modal)[0]?.props.visible).toBe(false);
  });
});
