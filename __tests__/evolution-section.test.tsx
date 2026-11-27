import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReactTestRenderer from 'react-test-renderer';
import { EvolutionStage } from '../src/domain';
import { EvolutionSection, EvolutionStageItem } from '../src/presentation';

// Crea una etapa de prueba; la imagen no influye.
const stage = (id: number, name: string): EvolutionStage => ({
  id,
  name,
  imageUrl: '',
});

const TYPE_COLOR = '#78c850';

const bulbasaurLine = [
  stage(1, 'bulbasaur'),
  stage(2, 'ivysaur'),
  stage(3, 'venusaur'),
];

// Monta la sección, espera a que el ScrollView de GH asiente su estado, devuelve las props de cada etapa y desmonta.
const renderedItems = async (stages: EvolutionStage[], currentId: number) => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(
      <GestureHandlerRootView>
        <EvolutionSection
          stages={stages}
          currentId={currentId}
          color={TYPE_COLOR}
          onSelect={jest.fn()}
        />
      </GestureHandlerRootView>,
    );
  });
  await ReactTestRenderer.act(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, 0));
  });
  const items = renderer.root
    .findAllByType(EvolutionStageItem)
    .map(item => item.props);
  await ReactTestRenderer.act(async () => {
    renderer.unmount();
  });
  return items;
};

// Ids de las etapas que se muestran, en orden.
const renderedIds = async (stages: EvolutionStage[], currentId: number) =>
  (await renderedItems(stages, currentId)).map(item => item.stage.id);

// Pruebas de que la fila de evoluciones muestra todas las etapas, esté donde esté la actual.
describe('EvolutionSection', () => {
  it('muestra las 3 etapas aunque la actual sea la última (Venusaur)', async () => {
    expect(await renderedIds(bulbasaurLine, 3)).toEqual([1, 2, 3]);
  });

  it('muestra las 3 etapas cuando la actual es la del medio', async () => {
    expect(await renderedIds(bulbasaurLine, 2)).toEqual([1, 2, 3]);
  });

  it('muestra todas las ramas aunque la actual sea la última', async () => {
    const eeveeLine = [
      stage(133, 'eevee'),
      ...[134, 135, 136, 196, 197, 470, 471, 700].map(id =>
        stage(id, `evolucion-${id}`),
      ),
    ];

    expect(await renderedIds(eeveeLine, 700)).toEqual(
      eeveeLine.map(({ id }) => id),
    );
  });

  it('pasa el color del tipo a todas las etapas y marca solo la actual', async () => {
    const items = await renderedItems(bulbasaurLine, 2);

    expect(items.map(item => item.color)).toEqual([
      TYPE_COLOR,
      TYPE_COLOR,
      TYPE_COLOR,
    ]);
    expect(items.map(item => item.isCurrent)).toEqual([false, true, false]);
  });
});
