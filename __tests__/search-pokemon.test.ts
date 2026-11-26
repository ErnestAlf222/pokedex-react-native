import { PokemonSummary, searchPokemon } from '../src/domain';

// Crea un resumen de prueba; la imagen no influye en la búsqueda.
const pokemon = (id: number, name: string): PokemonSummary => ({
  id,
  name,
  imageUrl: '',
});

const list: PokemonSummary[] = [
  pokemon(1, 'bulbasaur'),
  pokemon(25, 'pikachu'),
  pokemon(26, 'raichu'),
  pokemon(122, 'mr-mime'),
  pokemon(172, 'pichu'),
  pokemon(250, 'ho-oh'),
  pokemon(251, 'celebi'),
];

// Obtiene los nombres de los resultados para comparar con claridad.
const names = (results: PokemonSummary[]): string[] =>
  results.map(({ name }) => name);

// Pruebas de la búsqueda local por nombre y por número.
describe('searchPokemon', () => {
  it('coincide con una parte del nombre', () => {
    expect(names(searchPokemon(list, 'chu'))).toEqual([
      'pikachu',
      'raichu',
      'pichu',
    ]);
  });

  it('ignora mayúsculas y espacios sobrantes', () => {
    expect(names(searchPokemon(list, '  PIKA '))).toEqual(['pikachu']);
  });

  it('encuentra "mr-mime" escribiendo "mr mime" o "mr-mime"', () => {
    expect(names(searchPokemon(list, 'mr mime'))).toEqual(['mr-mime']);
    expect(names(searchPokemon(list, 'mr-mime'))).toEqual(['mr-mime']);
  });

  it('busca por número: coincide con el id y con los que empiezan igual', () => {
    expect(searchPokemon(list, '25').map(({ id }) => id)).toEqual([
      25, 250, 251,
    ]);
  });

  it('acepta ceros a la izquierda en la búsqueda por número', () => {
    expect(searchPokemon(list, '025').map(({ id }) => id)).toEqual([
      25, 250, 251,
    ]);
  });

  it('devuelve toda la lista con una consulta vacía', () => {
    expect(searchPokemon(list, '')).toEqual(list);
    expect(searchPokemon(list, '   ')).toEqual(list);
  });

  it('devuelve una lista vacía si nada coincide', () => {
    expect(searchPokemon(list, 'zzz')).toEqual([]);
    expect(searchPokemon(list, '999')).toEqual([]);
  });
});
