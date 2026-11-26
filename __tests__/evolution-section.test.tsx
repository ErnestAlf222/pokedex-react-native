import ReactTestRenderer from 'react-test-renderer';
import { EvolutionStage } from '../src/domain';
import {
  EvolutionSection,
  EvolutionStageItem,
} from '../src/presentation';

// Crea una etapa de prueba; la imagen no influye.
const stage = (id: number, name: string): EvolutionStage => ({
  id,
  name,
  imageUrl: '',
});

const bulbasaurLine = [
  stage(1, 'bulbasaur'),
  stage(2, 'ivysaur'),
  stage(3, 'venusaur'),
];

// Monta la sección y devuelve los ids de las etapas que se renderizan.
const renderedIds = (stages: EvolutionStage[], currentId: number): number[] => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <EvolutionSection
        stages={stages}
        currentId={currentId}
        onSelect={jest.fn()}
      />,
    );
  });
  return renderer.root
    .findAllByType(EvolutionStageItem)
    .map(item => item.props.stage.id);
};

// Pruebas de que la fila de evoluciones muestra todas las etapas, esté donde esté la actual.
describe('EvolutionSection', () => {
  it('muestra las 3 etapas aunque la actual sea la última (Venusaur)', () => {
    expect(renderedIds(bulbasaurLine, 3)).toEqual([1, 2, 3]);
  });

  it('muestra las 3 etapas cuando la actual es la del medio', () => {
    expect(renderedIds(bulbasaurLine, 2)).toEqual([1, 2, 3]);
  });

  it('muestra todas las ramas aunque la actual sea la última', () => {
    const eeveeLine = [
      stage(133, 'eevee'),
      ...[134, 135, 136, 196, 197, 470, 471, 700].map(id =>
        stage(id, `evolucion-${id}`),
      ),
    ];

    expect(renderedIds(eeveeLine, 700)).toEqual(eeveeLine.map(({ id }) => id));
  });
});
