import { ALL_GENERATIONS_VALUE, DEFAULT_SORT_ORDER } from '../src/core';
import { toPokemonGenerationIndex } from '../src/data';
import {
  PokemonFilterCriteria,
  PokemonSummary,
  PokemonTypeIndex,
  applyPokemonFilters,
  countPanelFilters,
  filterPokemonByGeneration,
  hasActiveFilters,
  sortPokemon,
} from '../src/domain';
import {
  generation1Dto,
  generation2Dto,
  generation9Dto,
} from '../__fixtures__/generation-data';

// Crea un resumen de prueba; la imagen no influye.
const pokemon = (id: number, name: string): PokemonSummary => ({
  id,
  name,
  imageUrl: '',
});

const list = [
  pokemon(1, 'bulbasaur'),
  pokemon(4, 'charmander'),
  pokemon(151, 'mew'),
  pokemon(152, 'chikorita'),
  pokemon(155, 'cyndaquil'),
  pokemon(250, 'ho-oh'),
  pokemon(906, 'sprigatito'),
  pokemon(1025, 'pecharunt'),
];

const typeIndex: PokemonTypeIndex = {
  1: ['grass', 'poison'],
  4: ['fire'],
  151: ['psychic'],
  152: ['grass'],
  155: ['fire'],
  250: ['fire', 'flying'],
  906: ['grass'],
  1025: ['poison', 'ghost'],
};

const generationIndex = toPokemonGenerationIndex([
  generation9Dto,
  generation1Dto,
  generation2Dto,
]);

const noFilters: PokemonFilterCriteria = {
  query: '',
  type: '',
  generation: ALL_GENERATIONS_VALUE,
  order: DEFAULT_SORT_ORDER,
};

// Convierte una lista de resúmenes en sus ids para comparar.
const ids = (items: PokemonSummary[]) => items.map(({ id }) => id);

// Aplica el pipeline con los índices de prueba.
const apply = (criteria: PokemonFilterCriteria) =>
  ids(applyPokemonFilters(list, criteria, typeIndex, generationIndex));

// Pruebas de la conversión de /generation a índice (id de especie → generación).
describe('toPokemonGenerationIndex', () => {
  it('lista las generaciones ordenadas por id, con su nombre en español y su región', () => {
    expect(generationIndex.generations).toEqual([
      { id: 1, name: 'Generación I', region: 'kanto' },
      { id: 2, name: 'Generación II', region: 'johto' },
      { id: 9, name: 'Generación IX', region: 'paldea' },
    ]);
  });

  it('asigna a cada especie la generación a la que pertenece', () => {
    expect(generationIndex.bySpecies).toEqual({
      1: 1,
      4: 1,
      151: 1,
      152: 2,
      155: 2,
      250: 2,
      906: 9,
      1025: 9,
    });
  });

  it('cae al slug legible si la generación no trae nombre', () => {
    const { generations } = toPokemonGenerationIndex([
      { ...generation1Dto, names: [] },
    ]);

    expect(generations[0]?.name).toBe('Generation I');
  });
});

// Pruebas del filtro por generación.
describe('filterPokemonByGeneration', () => {
  it('deja solo las especies de la generación elegida', () => {
    expect(ids(filterPokemonByGeneration(list, generationIndex, 1))).toEqual([
      1, 4, 151,
    ]);
    expect(ids(filterPokemonByGeneration(list, generationIndex, 9))).toEqual([
      906, 1025,
    ]);
  });

  it('con "Todas" devuelve la lista completa', () => {
    expect(
      filterPokemonByGeneration(list, generationIndex, ALL_GENERATIONS_VALUE),
    ).toBe(list);
  });

  it('devuelve vacío si la generación no existe en el índice', () => {
    expect(filterPokemonByGeneration(list, generationIndex, 5)).toEqual([]);
  });
});

// Pruebas del orden del listado.
describe('sortPokemon', () => {
  const shuffled = [list[3]!, list[0]!, list[7]!, list[1]!];

  it('ordena por número ascendente', () => {
    expect(ids(sortPokemon(shuffled, 'number-asc'))).toEqual([1, 4, 152, 1025]);
  });

  it('ordena por número descendente', () => {
    expect(ids(sortPokemon(shuffled, 'number-desc'))).toEqual([
      1025, 152, 4, 1,
    ]);
  });

  it('ordena por nombre A–Z', () => {
    expect(sortPokemon(shuffled, 'name-asc').map(({ name }) => name)).toEqual([
      'bulbasaur',
      'charmander',
      'chikorita',
      'pecharunt',
    ]);
  });

  it('no modifica la lista original', () => {
    const copy = [...shuffled];
    sortPokemon(shuffled, 'number-desc');

    expect(shuffled).toEqual(copy);
  });
});

// Pruebas del pipeline que compone búsqueda, tipo, generación y orden.
describe('applyPokemonFilters', () => {
  it('sin criterios devuelve toda la lista en orden ascendente', () => {
    expect(apply(noFilters)).toEqual(ids(list));
  });

  it('combina tipo y generación', () => {
    expect(apply({ ...noFilters, type: 'fire', generation: 2 })).toEqual([
      155, 250,
    ]);
  });

  it('combina búsqueda, tipo y generación', () => {
    expect(
      apply({ ...noFilters, query: 'cyn', type: 'fire', generation: 2 }),
    ).toEqual([155]);
  });

  it('aplica el orden al resultado filtrado', () => {
    const fire = { ...noFilters, type: 'fire' };

    expect(apply({ ...fire, order: 'number-desc' })).toEqual([250, 155, 4]);
    expect(apply({ ...fire, order: 'name-asc' })).toEqual([4, 155, 250]);
  });

  it('devuelve vacío cuando no hay coincidencias', () => {
    expect(apply({ ...noFilters, query: 'zzz' })).toEqual([]);
  });
});

// Pruebas del contador de filtros del panel y de la detección de filtros activos.
describe('countPanelFilters y hasActiveFilters', () => {
  it('cuenta 0 sin filtros del panel', () => {
    expect(countPanelFilters(noFilters)).toBe(0);
  });

  it('cuenta la generación y el orden por separado', () => {
    expect(countPanelFilters({ ...noFilters, generation: 3 })).toBe(1);
    expect(countPanelFilters({ ...noFilters, order: 'name-asc' })).toBe(1);
    expect(
      countPanelFilters({ ...noFilters, generation: 3, order: 'number-desc' }),
    ).toBe(2);
  });

  it('no cuenta el texto ni el tipo como filtros del panel', () => {
    const searching: PokemonFilterCriteria = {
      ...noFilters,
      query: 'a',
      type: 'fire',
    };

    expect(countPanelFilters(searching)).toBe(0);
  });

  it('hay filtros activos con texto, tipo, generación u orden', () => {
    expect(hasActiveFilters(noFilters)).toBe(false);
    expect(hasActiveFilters({ ...noFilters, query: '   ' })).toBe(false);
    expect(hasActiveFilters({ ...noFilters, query: 'a' })).toBe(true);
    expect(hasActiveFilters({ ...noFilters, type: 'fire' })).toBe(true);
    expect(hasActiveFilters({ ...noFilters, generation: 1 })).toBe(true);
    expect(hasActiveFilters({ ...noFilters, order: 'number-desc' })).toBe(true);
  });
});
