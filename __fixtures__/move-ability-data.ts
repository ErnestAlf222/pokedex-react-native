import { AbilityDto, MoveDto } from '../src/data';

// Datos reales de PokéAPI recortados a los campos que usan los DTO, en español e inglés.
export const tackleDto: MoveDto = {
  name: 'tackle',
  type: { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
  damage_class: {
    name: 'physical',
    url: 'https://pokeapi.co/api/v2/move-damage-class/2/',
  },
  power: 40,
  accuracy: 100,
  pp: 35,
  names: [
    {
      name: 'Placaje',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      name: 'Tackle',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text: 'Embestida con todo el cuerpo.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text:
        'A physical attack in which the user charges and slams into the target with its whole body.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
    {
      flavor_text: 'Embestida con todo el cuerpo.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text:
        'The user attacks by charging forward and slamming into targets with its whole body.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};

export const growlDto: MoveDto = {
  name: 'growl',
  type: { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' },
  damage_class: {
    name: 'status',
    url: 'https://pokeapi.co/api/v2/move-damage-class/1/',
  },
  power: null,
  accuracy: 100,
  pp: 40,
  names: [
    {
      name: 'Gruñido',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      name: 'Growl',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text:
        'Dulce gruñido que distrae al objetivo para que baje la guardia y reduce su Ataque.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text:
        'The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
    {
      flavor_text:
        'Dulce gruñido que distrae al objetivo para que baje la guardia y reduce su Ataque durante un breve período de tiempo.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text:
        'The user growls endearingly to make targets less wary, which lowers their Attack stats for a short time.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};

export const hurricaneDto: MoveDto = {
  name: 'hurricane',
  type: { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/' },
  damage_class: {
    name: 'special',
    url: 'https://pokeapi.co/api/v2/move-damage-class/3/',
  },
  power: 110,
  accuracy: 70,
  pp: 10,
  names: [
    {
      name: 'Vendaval',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      name: 'Hurricane',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text:
        'Golpea al objetivo con un fuerte torbellino que lo envuelve y puede confundirlo.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text:
        'The user attacks by wrapping the target in a fierce wind. This may also confuse the target.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
    {
      flavor_text:
        'Golpea al objetivo con un fuerte torbellino que lo envuelve y puede confundirlo.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text:
        'The user attacks by wrapping targets in a fierce wind. This may also leave targets confused.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};

export const overgrowDto: AbilityDto = {
  name: 'overgrow',
  names: [
    {
      name: 'Espesura',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      name: 'Overgrow',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text:
        'Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text: 'Powers up Grass-type moves when the Pokémon’s HP is low.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
    {
      flavor_text:
        'Potencia sus movimientos de tipo Planta cuando le quedan pocos PS.',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      flavor_text: 'Powers up Grass-type moves when the Pokémon’s HP is low.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};
