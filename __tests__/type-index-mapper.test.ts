import { TypeDto, toPokemonTypeIndex } from '../src/data';

const API = 'https://pokeapi.co/api/v2';

// Crea una entrada de /type/{tipo} como la devuelve PokéAPI.
const entry = (slot: number, name: string, id: number) => ({
  slot,
  pokemon: { name, url: `${API}/pokemon/${id}/` },
});

// Datos reales recortados de /type/grass, /type/poison y /type/fire (incluye formas alternativas).
const poison: TypeDto = {
  id: 4,
  name: 'poison',
  pokemon: [entry(2, 'bulbasaur', 1), entry(2, 'venusaur-mega', 10033)],
};
const grass: TypeDto = {
  id: 12,
  name: 'grass',
  pokemon: [entry(1, 'bulbasaur', 1), entry(1, 'venusaur-mega', 10033)],
};
const fire: TypeDto = {
  id: 10,
  name: 'fire',
  pokemon: [entry(1, 'charmander', 4), entry(1, 'charizard-mega-x', 10034)],
};

const speciesIds = new Set([1, 4]);

// Pruebas del mapper que construye el índice de tipos por Pokémon.
describe('toPokemonTypeIndex', () => {
  const index = toPokemonTypeIndex([poison, grass, fire], speciesIds);

  it('ordena los tipos por slot aunque lleguen invertidos (Bulbasaur)', () => {
    expect(index[1]).toEqual(['grass', 'poison']);
  });

  it('devuelve un solo tipo para un Pokémon de un tipo (Charmander)', () => {
    expect(index[4]).toEqual(['fire']);
  });

  it('descarta los ids de formas alternativas', () => {
    expect(Object.keys(index)).toEqual(['1', '4']);
    expect(index[10033]).toBeUndefined();
    expect(index[10034]).toBeUndefined();
  });

  it('devuelve un índice vacío si no hay especies válidas', () => {
    expect(toPokemonTypeIndex([poison, grass, fire], new Set())).toEqual({});
  });
});
