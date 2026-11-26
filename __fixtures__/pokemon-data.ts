import {
  ChainLinkDto,
  EvolutionChainDto,
  NamedResourceDto,
  PokemonDto,
} from '../src/data';

const API = 'https://pokeapi.co/api/v2';

// Crea un recurso con nombre y URL como los que devuelve PokéAPI.
const resource = (path: string, name: string, id: number): NamedResourceDto => ({
  name,
  url: `${API}/${path}/${id}/`,
});

// Crea la referencia a una especie por nombre e id.
const species = (name: string, id: number): NamedResourceDto =>
  resource('pokemon-species', name, id);

// Crea un eslabón de la cadena evolutiva con sus evoluciones siguientes.
const link = (
  name: string,
  id: number,
  evolvesTo: ChainLinkDto[] = [],
): ChainLinkDto => ({ species: species(name, id), evolves_to: evolvesTo });

// Datos reales de /pokemon/1 (recortados a los campos que usa el DTO).
export const bulbasaurDto: PokemonDto = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [
    { type: resource('type', 'grass', 12) },
    { type: resource('type', 'poison', 4) },
  ],
  stats: [
    { base_stat: 45, stat: resource('stat', 'hp', 1) },
    { base_stat: 49, stat: resource('stat', 'attack', 2) },
    { base_stat: 49, stat: resource('stat', 'defense', 3) },
    { base_stat: 65, stat: resource('stat', 'special-attack', 4) },
    { base_stat: 65, stat: resource('stat', 'special-defense', 5) },
    { base_stat: 45, stat: resource('stat', 'speed', 6) },
  ],
  abilities: [
    { ability: resource('ability', 'overgrow', 65) },
    { ability: resource('ability', 'chlorophyll', 34) },
  ],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  },
  species: species('bulbasaur', 1),
};

// Datos reales de /evolution-chain/1: cadena lineal de 3 etapas.
export const bulbasaurChainDto: EvolutionChainDto = {
  id: 1,
  chain: link('bulbasaur', 1, [link('ivysaur', 2, [link('venusaur', 3)])]),
};

// Datos reales de /evolution-chain/67: Eevee con 8 evoluciones ramificadas.
export const eeveeChainDto: EvolutionChainDto = {
  id: 67,
  chain: link('eevee', 133, [
    link('vaporeon', 134),
    link('jolteon', 135),
    link('flareon', 136),
    link('espeon', 196),
    link('umbreon', 197),
    link('leafeon', 470),
    link('glaceon', 471),
    link('sylveon', 700),
  ]),
};
