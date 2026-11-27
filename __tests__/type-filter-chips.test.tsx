import ReactTestRenderer from 'react-test-renderer';
import {
  ALL_TYPES_VALUE,
  POKEMON_TYPES,
  UI_MESSAGES,
  getTypeLabel,
} from '../src/core';
import { TypeFilterChip, TypeFilterChips } from '../src/presentation';
import { allTexts, pressText } from '../__fixtures__/render-utils';

// Monta la fila de chips con el tipo indicado como seleccionado.
const renderChips = async (selected: string, onSelect = jest.fn()) => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(
      <TypeFilterChips
        types={[...POKEMON_TYPES]}
        selected={selected}
        onSelect={onSelect}
      />,
    );
  });
  return { renderer, onSelect };
};

afterEach(() => {
  jest.clearAllMocks();
});

// Pruebas de la fila de chips: los 19 chips, el seleccionado y el callback.
describe('TypeFilterChips', () => {
  it('renderiza "Todos" y los 18 tipos (19 chips) con su etiqueta en español', async () => {
    const { renderer } = await renderChips(ALL_TYPES_VALUE);
    const expected = [UI_MESSAGES.allTypes, ...POKEMON_TYPES.map(getTypeLabel)];
    const labels = allTexts(renderer).filter(text => expected.includes(text));

    expect(renderer.root.findAllByType(TypeFilterChip)).toHaveLength(19);
    expect(labels).toEqual(expected);
  });

  it('marca solo "Todos" como seleccionado al inicio', async () => {
    const { renderer } = await renderChips(ALL_TYPES_VALUE);
    const active = renderer.root
      .findAllByType(TypeFilterChip)
      .filter(chip => chip.props.isActive)
      .map(chip => chip.props.type);

    expect(active).toEqual([ALL_TYPES_VALUE]);
  });

  it('marca como seleccionado únicamente el chip del tipo elegido', async () => {
    const { renderer } = await renderChips('fire');
    const active = renderer.root
      .findAllByType(TypeFilterChip)
      .filter(chip => chip.props.isActive)
      .map(chip => chip.props.type);

    expect(active).toEqual(['fire']);
  });

  it('expone el estado seleccionado para accesibilidad', async () => {
    const { renderer } = await renderChips('water');
    const selected = renderer.root
      .findAll(
        node =>
          node.props.accessibilityRole === 'button' &&
          node.props.accessibilityState?.selected === true,
      )
      .filter(node => typeof node.type === 'function');

    expect(selected.length).toBeGreaterThan(0);
  });

  it('llama a onSelect con el tipo al pulsar un chip', async () => {
    const { renderer, onSelect } = await renderChips(ALL_TYPES_VALUE);

    await pressText(renderer, getTypeLabel('grass'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('grass');
  });

  it('llama a onSelect con el valor vacío al pulsar "Todos"', async () => {
    const { renderer, onSelect } = await renderChips('fire');

    await pressText(renderer, UI_MESSAGES.allTypes);

    expect(onSelect).toHaveBeenCalledWith(ALL_TYPES_VALUE);
  });
});
