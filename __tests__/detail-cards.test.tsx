import { POKEMON_QUERY_KEYS, POKEMON_TYPES } from '../src/core';
import { toAbilityDetail } from '../src/data';
import { completeTypeMultipliers } from '../src/domain';
import {
  AbilityCard,
  EffectivenessCell,
  EffectivenessMatrix,
  container,
} from '../src/presentation';
import { overgrowDto } from '../__fixtures__/move-ability-data';
import {
  allTexts,
  cleanupRenders,
  createTestQueryClient,
  renderWithClient,
} from '../__fixtures__/render-utils';

// Reemplaza el contenedor para controlar el resultado de los casos de uso.
jest.mock('../src/presentation/di', () => ({
  container: {
    getAbilityDetailUseCase: { execute: jest.fn() },
  },
}));

const executeAbility = jest.mocked(container.getAbilityDetailUseCase.execute);

const TINT = '#7AC74C';

afterEach(cleanupRenders);

beforeEach(() => {
  jest.resetAllMocks();
  executeAbility.mockRejectedValue(new Error('sin red'));
});

// Pruebas de la tarjeta de habilidad: con datos, sin datos y con la marca de oculta.
describe('AbilityCard', () => {
  const clientWithAbility = () => {
    const client = createTestQueryClient();
    client.setQueryData(
      POKEMON_QUERY_KEYS.ability('overgrow'),
      toAbilityDetail(overgrowDto),
    );
    return client;
  };

  it('con datos muestra nombre y descripción en español', async () => {
    const renderer = await renderWithClient(
      <AbilityCard name="overgrow" isHidden={false} color={TINT} />,
      clientWithAbility(),
    );
    const texts = allTexts(renderer);

    expect(texts).toContain('Espesura');
    expect(texts).toContain(
      'Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.',
    );
    expect(texts).not.toContain('Oculta');
  });

  it('marca "Oculta" cuando la habilidad es oculta', async () => {
    const renderer = await renderWithClient(
      <AbilityCard name="overgrow" isHidden color={TINT} />,
      clientWithAbility(),
    );

    expect(allTexts(renderer)).toContain('Oculta');
  });

  it('sin datos muestra solo el nombre legible, sin descripción ni errores', async () => {
    const renderer = await renderWithClient(
      <AbilityCard name="solar-power" isHidden color={TINT} />,
      createTestQueryClient(),
    );

    expect(allTexts(renderer)).toEqual(['Solar Power', 'Oculta']);
  });
});

// Pruebas de la matriz de efectividad: una celda por tipo, con el multiplicador debajo.
describe('EffectivenessMatrix', () => {
  const multipliers = completeTypeMultipliers(
    {
      weaknesses: [{ type: 'fire', multiplier: 2 }],
      resistances: [{ type: 'grass', multiplier: 0.25 }],
      immunities: [{ type: 'ground', multiplier: 0 }],
    },
    POKEMON_TYPES,
  );

  it('dibuja una celda por cada uno de los 18 tipos', async () => {
    const renderer = await renderWithClient(
      <EffectivenessMatrix multipliers={multipliers} />,
      createTestQueryClient(),
    );

    expect(renderer.root.findAllByType(EffectivenessCell)).toHaveLength(18);
  });

  it('muestra el multiplicador de cada celda con su texto', async () => {
    const renderer = await renderWithClient(
      <EffectivenessMatrix multipliers={multipliers} />,
      createTestQueryClient(),
    );
    const texts = allTexts(renderer);

    expect(texts.filter(text => text === '×1')).toHaveLength(15);
    expect(texts).toEqual(expect.arrayContaining(['×2', '×¼', '×0']));
  });
});
