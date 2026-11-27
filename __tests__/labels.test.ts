import {
  EGG_GROUP_LABELS,
  GROWTH_RATE_LABELS,
  HABITAT_LABELS,
  LabelMap,
  REGION_LABELS,
  SORT_ORDERS,
  SORT_ORDER_ICONS,
  SORT_ORDER_LABELS,
  TYPE_LABELS,
  getGenerationLabel,
  getLabel,
  getTypeLabel,
} from '../src/core';
import {
  API_EGG_GROUP_NAMES,
  API_GROWTH_RATE_NAMES,
  API_HABITAT_NAMES,
  API_REGION_NAMES,
  API_TYPE_NAMES,
} from '../__fixtures__/api-lists';

// Pruebas del helper de etiquetas con respaldo al slug legible.
describe('getLabel', () => {
  it('devuelve la etiqueta del mapa', () => {
    expect(getLabel(TYPE_LABELS, 'fire')).toBe('Fuego');
    expect(getLabel(HABITAT_LABELS, 'rough-terrain')).toBe(
      'Terreno accidentado',
    );
  });

  it('cae a formatSlug si falta la clave', () => {
    expect(getLabel({}, 'solar-power')).toBe('Solar Power');
    expect(getLabel(TYPE_LABELS, 'new-type')).toBe('New Type');
  });

  it('getTypeLabel usa el mapa de tipos', () => {
    expect(getTypeLabel('ghost')).toBe('Fantasma');
  });
});

// Falla si PokéAPI trae una clave sin etiqueta en español (o la etiqueta está vacía).
const missingLabels = (labels: LabelMap, names: string[]) =>
  names.filter(name => (labels[name] ?? '').trim() === '');

describe('completitud de etiquetas con las listas reales de la API', () => {
  it('todos los tipos tienen etiqueta', () => {
    expect(missingLabels(TYPE_LABELS, API_TYPE_NAMES)).toEqual([]);
  });

  it('todos los grupos huevo tienen etiqueta', () => {
    expect(missingLabels(EGG_GROUP_LABELS, API_EGG_GROUP_NAMES)).toEqual([]);
  });

  it('todos los hábitats tienen etiqueta', () => {
    expect(missingLabels(HABITAT_LABELS, API_HABITAT_NAMES)).toEqual([]);
  });

  it('todas las tasas de crecimiento tienen etiqueta', () => {
    expect(missingLabels(GROWTH_RATE_LABELS, API_GROWTH_RATE_NAMES)).toEqual(
      [],
    );
  });

  it('no sobran etiquetas que la API no devuelva', () => {
    expect(Object.keys(TYPE_LABELS).sort()).toEqual([...API_TYPE_NAMES].sort());
    expect(Object.keys(EGG_GROUP_LABELS).sort()).toEqual(
      [...API_EGG_GROUP_NAMES].sort(),
    );
    expect(Object.keys(HABITAT_LABELS).sort()).toEqual(
      [...API_HABITAT_NAMES].sort(),
    );
    expect(Object.keys(GROWTH_RATE_LABELS).sort()).toEqual(
      [...API_GROWTH_RATE_NAMES].sort(),
    );
  });
});

// Pruebas de las etiquetas de región, generación y orden.
describe('etiquetas de generaciones y orden', () => {
  it('todas las regiones principales de las generaciones tienen etiqueta, y no sobran', () => {
    expect(missingLabels(REGION_LABELS, API_REGION_NAMES)).toEqual([]);
    expect(Object.keys(REGION_LABELS).sort()).toEqual(
      [...API_REGION_NAMES].sort(),
    );
  });

  it('arma la etiqueta de la generación con su región en español', () => {
    expect(getGenerationLabel('Generación V', 'unova')).toBe(
      'Generación V · Teselia',
    );
    expect(getGenerationLabel('Generación I', 'kanto')).toBe(
      'Generación I · Kanto',
    );
  });

  it('cada criterio de orden tiene etiqueta e ícono', () => {
    expect(missingLabels(SORT_ORDER_LABELS, [...SORT_ORDERS])).toEqual([]);
    expect(Object.keys(SORT_ORDER_ICONS).sort()).toEqual(
      [...SORT_ORDERS].sort(),
    );
  });
});
