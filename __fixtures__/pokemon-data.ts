import {
  ChainLinkDto,
  EvolutionChainDto,
  MoveVersionDetailDto,
  NamedResourceDto,
  PokemonDto,
  PokemonMoveDto,
  PokemonSpeciesDto,
  TypeDamageRelationsDto,
} from '../src/data';

const API = 'https://pokeapi.co/api/v2';

// Crea un recurso con nombre y URL como los que devuelve PokéAPI.
const resource = (
  path: string,
  name: string,
  id: number,
): NamedResourceDto => ({
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

// Crea un movimiento con sus detalles por grupo de versiones: [grupo, nivel, método].
const move = (
  name: string,
  id: number,
  details: [group: string, level: number, method: string][],
): PokemonMoveDto => ({
  move: resource('move', name, id),
  version_group_details: details.map(
    ([group, level, method]): MoveVersionDetailDto => ({
      level_learned_at: level,
      move_learn_method: resource('move-learn-method', method, 1),
      version_group: resource('version-group', group, 1),
    }),
  ),
});

// Datos reales de /pokemon/1 (recortados a los campos que usa el DTO y a 4 grupos de versiones).
export const bulbasaurDto: PokemonDto = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
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
  moves: [
    move('vine-whip', 22, [
      ['red-blue', 13, 'level-up'],
      ['scarlet-violet', 3, 'level-up'],
      ['blue-japan', 13, 'level-up'],
      ['legends-za', 3, 'level-up'],
    ]),
    move('tackle', 33, [
      ['red-blue', 1, 'level-up'],
      ['scarlet-violet', 1, 'level-up'],
      ['blue-japan', 1, 'level-up'],
      ['legends-za', 1, 'level-up'],
    ]),
    move('take-down', 36, [
      ['red-blue', 0, 'machine'],
      ['scarlet-violet', 21, 'level-up'],
      ['scarlet-violet', 0, 'machine'],
      ['blue-japan', 0, 'machine'],
      ['legends-za', 25, 'level-up'],
    ]),
    move('double-edge', 38, [
      ['red-blue', 0, 'machine'],
      ['scarlet-violet', 0, 'machine'],
      ['blue-japan', 0, 'machine'],
      ['legends-za', 45, 'level-up'],
      ['legends-za', 0, 'machine'],
    ]),
    move('growl', 45, [
      ['red-blue', 1, 'level-up'],
      ['scarlet-violet', 1, 'level-up'],
      ['blue-japan', 1, 'level-up'],
      ['legends-za', 1, 'level-up'],
    ]),
    move('leech-seed', 73, [
      ['red-blue', 7, 'level-up'],
      ['scarlet-violet', 9, 'level-up'],
      ['blue-japan', 7, 'level-up'],
      ['legends-za', 9, 'level-up'],
    ]),
    move('growth', 74, [
      ['red-blue', 34, 'level-up'],
      ['scarlet-violet', 6, 'level-up'],
      ['blue-japan', 34, 'level-up'],
      ['legends-za', 6, 'level-up'],
    ]),
    move('razor-leaf', 75, [
      ['red-blue', 27, 'level-up'],
      ['scarlet-violet', 12, 'level-up'],
      ['blue-japan', 27, 'level-up'],
      ['legends-za', 12, 'level-up'],
    ]),
    move('solar-beam', 76, [
      ['red-blue', 48, 'level-up'],
      ['red-blue', 0, 'machine'],
      ['scarlet-violet', 36, 'level-up'],
      ['scarlet-violet', 0, 'machine'],
      ['blue-japan', 48, 'level-up'],
      ['blue-japan', 0, 'machine'],
      ['legends-za', 55, 'level-up'],
      ['legends-za', 0, 'machine'],
    ]),
    move('poison-powder', 77, [
      ['red-blue', 20, 'level-up'],
      ['scarlet-violet', 15, 'level-up'],
      ['blue-japan', 20, 'level-up'],
      ['legends-za', 15, 'level-up'],
    ]),
    move('sleep-powder', 79, [
      ['red-blue', 41, 'level-up'],
      ['scarlet-violet', 15, 'level-up'],
      ['blue-japan', 41, 'level-up'],
      ['legends-za', 15, 'level-up'],
    ]),
    move('amnesia', 133, [['legends-za', 40, 'level-up']]),
    move('synthesis', 235, [
      ['scarlet-violet', 27, 'level-up'],
      ['legends-za', 35, 'level-up'],
    ]),
    move('magical-leaf', 345, [
      ['scarlet-violet', 0, 'machine'],
      ['legends-za', 30, 'level-up'],
    ]),
    move('sludge-wave', 482, [['legends-za', 42, 'level-up']]),
    move('swords-dance', 14, [
      ['red-blue', 0, 'machine'],
      ['scarlet-violet', 0, 'machine'],
      ['blue-japan', 0, 'machine'],
      ['legends-za', 0, 'machine'],
    ]),
  ],
  species: species('bulbasaur', 1),
};

// Datos reales de /pokemon-species/1 (recortados a 3 textos en es, 2 en en y las categorías).
export const bulbasaurSpeciesDto: PokemonSpeciesDto = {
  id: 1,
  name: 'bulbasaur',
  evolution_chain: { url: `${API}/evolution-chain/1/` },
  flavor_text_entries: [
    {
      flavor_text:
        'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.',
      language: resource('language', 'en', 9),
    },
    {
      flavor_text:
        'Una rara semilla le fue plantada en el lomo al nacer.\nLa planta brota y crece con este Pokémon.',
      language: resource('language', 'es', 7),
    },
    {
      flavor_text:
        'Después de nacer, crece alimentándose de las\nsemillas de su lomo.',
      language: resource('language', 'es', 7),
    },
    {
      flavor_text:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      language: resource('language', 'en', 9),
    },
    {
      flavor_text:
        'Nace con un extraño bulbo plantado en el lomo que se va desarrollando a medida que el Pokémon crece.',
      language: resource('language', 'es', 7),
    },
  ],
  genera: [
    { genus: 'Pokémon Semilla', language: resource('language', 'es', 7) },
    { genus: 'Seed Pokémon', language: resource('language', 'en', 9) },
  ],
  capture_rate: 45,
  gender_rate: 1,
  egg_groups: [
    resource('egg-group', 'monster', 1),
    resource('egg-group', 'plant', 7),
  ],
  habitat: resource('pokemon-habitat', 'grassland', 3),
  base_happiness: 70,
  growth_rate: resource('growth-rate', 'medium-slow', 4),
  is_legendary: false,
  is_mythical: false,
  is_baby: false,
};

// Crea las relaciones de daño recibido de un tipo a partir de listas de nombres.
const damageFrom = (
  name: string,
  double: string[],
  half: string[],
  none: string[],
): TypeDamageRelationsDto => ({
  name,
  damage_relations: {
    double_damage_from: double.map(type => resource('type', type, 1)),
    half_damage_from: half.map(type => resource('type', type, 1)),
    no_damage_from: none.map(type => resource('type', type, 1)),
  },
});

// Datos reales de /type/grass, /type/poison y /type/ghost (solo el daño recibido).
export const grassTypeDto = damageFrom(
  'grass',
  ['flying', 'poison', 'bug', 'fire', 'ice'],
  ['ground', 'water', 'grass', 'electric'],
  [],
);
export const poisonTypeDto = damageFrom(
  'poison',
  ['ground', 'psychic'],
  ['fighting', 'poison', 'bug', 'grass', 'fairy'],
  [],
);
export const ghostTypeDto = damageFrom(
  'ghost',
  ['ghost', 'dark'],
  ['poison', 'bug'],
  ['normal', 'fighting'],
);

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
