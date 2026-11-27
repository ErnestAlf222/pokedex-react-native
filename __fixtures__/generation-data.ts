import { GenerationDto } from '../src/data';

// Datos reales de /generation/{id} recortados: nombres en es/en, región principal y unas pocas especies.
export const generation1Dto: GenerationDto = {
  id: 1,
  name: 'generation-i',
  main_region: { name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
  names: [
    {
      name: 'Generación I',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      name: 'Generation I',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  pokemon_species: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
    { name: 'mew', url: 'https://pokeapi.co/api/v2/pokemon-species/151/' },
  ],
};

export const generation2Dto: GenerationDto = {
  id: 2,
  name: 'generation-ii',
  main_region: { name: 'johto', url: 'https://pokeapi.co/api/v2/region/2/' },
  names: [
    {
      name: 'Generación II',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      name: 'Generation II',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  pokemon_species: [
    {
      name: 'chikorita',
      url: 'https://pokeapi.co/api/v2/pokemon-species/152/',
    },
    {
      name: 'cyndaquil',
      url: 'https://pokeapi.co/api/v2/pokemon-species/155/',
    },
    { name: 'ho-oh', url: 'https://pokeapi.co/api/v2/pokemon-species/250/' },
  ],
};

export const generation9Dto: GenerationDto = {
  id: 9,
  name: 'generation-ix',
  main_region: { name: 'paldea', url: 'https://pokeapi.co/api/v2/region/10/' },
  names: [
    {
      name: 'Generación IX',
      language: { name: 'es', url: 'https://pokeapi.co/api/v2/language/7/' },
    },
    {
      name: 'Generation IX',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
  pokemon_species: [
    {
      name: 'sprigatito',
      url: 'https://pokeapi.co/api/v2/pokemon-species/906/',
    },
    {
      name: 'pecharunt',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1025/',
    },
  ],
};
