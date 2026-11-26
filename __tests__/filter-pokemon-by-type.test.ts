import {
  PokemonSummary,
  PokemonTypeIndex,
  filterPokemonByType,
  listTypeNames,
  searchPokemon,
} from '../src/domain';

// Crea un resumen de prueba; la imagen no influye.
const pokemon = (id: number, name: string): PokemonSummary => ({
  id,
  name,
  imageUrl: '',
});

const list: PokemonSummary[] = [
  pokemon(1, 'bulbasaur'),
  pokemon(4, 'charmander'),
  pokemon(5, 'charmeleon'),
  pokemon(6, 'charizard'),
  pokemon(737, 'charjabug'),
  pokemon(7, 'squirtle'),
];

// Índice con datos reales de tipos (slot 1 primero).
const typeIndex: PokemonTypeIndex = {
  1: ['grass', 'poison'],
  4: ['fire'],
  5: ['fire'],
  6: ['fire', 'flying'],
  737: ['bug', 'electric'],
  7: ['water'],
};

// Obtiene los nombres de los resultados para comparar con claridad.
const names = (results: PokemonSummary[]): string[] =>
  results.map(({ name }) => name);

// Pruebas del filtro por tipo, solo y combinado con la búsqueda por texto.
describe('filterPokemonByType', () => {
  it('devuelve los Pokémon que tienen el tipo (en cualquier slot)', () => {
    expect(names(filterPokemonByType(list, typeIndex, 'fire'))).toEqual([
      'charmander',
      'charmeleon',
      'charizard',
    ]);
    expect(names(filterPokemonByType(list, typeIndex, 'flying'))).toEqual([
      'charizard',
    ]);
  });

  it('devuelve toda la lista con el tipo vacío', () => {
    expect(filterPokemonByType(list, typeIndex, '')).toEqual(list);
  });

  it('devuelve una lista vacía si ningún Pokémon tiene el tipo', () => {
    expect(filterPokemonByType(list, typeIndex, 'dragon')).toEqual([]);
  });

  it('ignora los Pokémon que no están en el índice', () => {
    expect(filterPokemonByType(list, {}, 'fire')).toEqual([]);
  });

  it('se combina con la búsqueda por texto', () => {
    const byText = searchPokemon(list, 'char');

    expect(names(filterPokemonByType(byText, typeIndex, 'fire'))).toEqual([
      'charmander',
      'charmeleon',
      'charizard',
    ]);
    expect(names(filterPokemonByType(byText, typeIndex, 'bug'))).toEqual([
      'charjabug',
    ]);
    expect(filterPokemonByType(byText, typeIndex, 'water')).toEqual([]);
  });
});

// Pruebas de la lista de tipos derivada del índice.
describe('listTypeNames', () => {
  it('deriva los tipos del índice sin repetir y ordenados', () => {
    expect(listTypeNames(typeIndex)).toEqual([
      'bug',
      'electric',
      'fire',
      'flying',
      'grass',
      'poison',
      'water',
    ]);
  });

  it('devuelve una lista vacía con un índice vacío', () => {
    expect(listTypeNames({})).toEqual([]);
  });
});
