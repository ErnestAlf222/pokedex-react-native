import {
  MAX_DETAIL_MOVES,
  POKEMON_ID_PLACEHOLDER,
  POKEMON_IMAGE_URL_TEMPLATE,
  POKEMON_SHINY_IMAGE_URL_TEMPLATE,
} from '../src/core';
import { PokemonDto, PokemonSpeciesDto, toPokemonDetail } from '../src/data';
import {
  bulbasaurChainDto,
  bulbasaurDto,
  bulbasaurSpeciesDto,
} from '../__fixtures__/pokemon-data';

// Pruebas del mapper de detalle con los datos reales de Bulbasaur.
describe('toPokemonDetail', () => {
  const detail = toPokemonDetail(
    bulbasaurDto,
    bulbasaurSpeciesDto,
    bulbasaurChainDto,
  );

  it('mapea los datos básicos y las imágenes desde las plantillas de config', () => {
    expect(detail).toMatchObject({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      imageUrl: POKEMON_IMAGE_URL_TEMPLATE.replace(POKEMON_ID_PLACEHOLDER, '1'),
      shinyImageUrl: POKEMON_SHINY_IMAGE_URL_TEMPLATE.replace(
        POKEMON_ID_PLACEHOLDER,
        '1',
      ),
    });
  });

  it('usa el nombre de la especie y no el de la forma (Deoxys)', () => {
    const deoxys = toPokemonDetail(
      {
        ...bulbasaurDto,
        id: 386,
        name: 'deoxys-normal',
        species: {
          name: 'deoxys',
          url: 'https://pokeapi.co/api/v2/pokemon-species/386/',
        },
      },
      bulbasaurSpeciesDto,
      bulbasaurChainDto,
    );

    expect(deoxys.name).toBe('deoxys');
  });

  it('mapea los tipos y las habilidades', () => {
    expect(detail.types).toEqual(['grass', 'poison']);
    expect(detail.abilities).toEqual([
      { name: 'overgrow', isHidden: false },
      { name: 'chlorophyll', isHidden: true },
    ]);
  });

  it('mapea los stats con su nombre y valor base, y calcula el total', () => {
    expect(detail.stats).toEqual([
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
      { name: 'defense', value: 49 },
      { name: 'special-attack', value: 65 },
      { name: 'special-defense', value: 65 },
      { name: 'speed', value: 45 },
    ]);
    expect(detail.statsTotal).toBe(318);
  });

  it('incluye las evoluciones aplanadas por etapa', () => {
    expect(detail.evolutions.map(({ name }) => name)).toEqual([
      'bulbasaur',
      'ivysaur',
      'venusaur',
    ]);
  });

  it('mapea los datos de la especie', () => {
    expect(detail).toMatchObject({
      category: 'Pokémon Semilla',
      captureRate: 45,
      eggGroups: ['monster', 'plant'],
      habitat: 'grassland',
      baseHappiness: 70,
      growthRate: 'medium-slow',
      baseExperience: 64,
      isLegendary: false,
      isMythical: false,
      isBaby: false,
    });
  });

  it('usa la descripción más reciente en español, sin saltos de línea', () => {
    expect(detail.description).toBe(
      'Nace con un extraño bulbo plantado en el lomo que se va desarrollando a medida que el Pokémon crece.',
    );
  });

  it('calcula la proporción de género (1/8 hembra)', () => {
    expect(detail.gender).toEqual({ female: 12.5, male: 87.5 });
  });

  it('devuelve el género en null si la especie no tiene género', () => {
    const genderless = toPokemonDetail(
      bulbasaurDto,
      { ...bulbasaurSpeciesDto, gender_rate: -1 },
      bulbasaurChainDto,
    );

    expect(genderless.gender).toBeNull();
  });

  it('devuelve el hábitat en null si la especie no tiene', () => {
    const noHabitat = toPokemonDetail(
      bulbasaurDto,
      { ...bulbasaurSpeciesDto, habitat: null },
      bulbasaurChainDto,
    );

    expect(noHabitat.habitat).toBeNull();
  });

  it('cae al inglés si la especie no tiene entradas en español', () => {
    const species: PokemonSpeciesDto = {
      ...bulbasaurSpeciesDto,
      flavor_text_entries: bulbasaurSpeciesDto.flavor_text_entries.filter(
        ({ language }) => language.name !== 'es',
      ),
      genera: bulbasaurSpeciesDto.genera.filter(
        ({ language }) => language.name !== 'es',
      ),
    };
    const fallback = toPokemonDetail(bulbasaurDto, species, bulbasaurChainDto);

    expect(fallback.description).toBe(
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    );
    expect(fallback.category).toBe('Seed Pokémon');
  });

  it('deja descripción y categoría vacías si no hay ni español ni inglés', () => {
    const empty = toPokemonDetail(
      bulbasaurDto,
      { ...bulbasaurSpeciesDto, flavor_text_entries: [], genera: [] },
      bulbasaurChainDto,
    );

    expect(empty.description).toBe('');
    expect(empty.category).toBe('');
  });

  it('toma los movimientos por nivel del grupo más reciente, ordenados por nivel y limitados', () => {
    expect(detail.moves).toHaveLength(MAX_DETAIL_MOVES);
    expect(detail.moves).toEqual([
      { name: 'tackle', level: 1 },
      { name: 'growl', level: 1 },
      { name: 'vine-whip', level: 3 },
      { name: 'growth', level: 6 },
      { name: 'leech-seed', level: 9 },
      { name: 'razor-leaf', level: 12 },
      { name: 'poison-powder', level: 15 },
      { name: 'sleep-powder', level: 15 },
      { name: 'take-down', level: 25 },
      { name: 'magical-leaf', level: 30 },
    ]);
  });

  it('no depende del orden de la API: el grupo más reciente se decide por la lista de config', () => {
    const reversed: PokemonDto = {
      ...bulbasaurDto,
      moves: bulbasaurDto.moves.map(entry => ({
        ...entry,
        version_group_details: [...entry.version_group_details].reverse(),
      })),
    };

    expect(
      toPokemonDetail(reversed, bulbasaurSpeciesDto, bulbasaurChainDto).moves,
    ).toEqual(detail.moves);
  });

  it('cae al grupo más reciente donde sí aprende movimientos por nivel', () => {
    const oldGamesOnly: PokemonDto = {
      ...bulbasaurDto,
      moves: bulbasaurDto.moves.map(entry => ({
        ...entry,
        version_group_details: entry.version_group_details.filter(
          ({ version_group }) => version_group.name === 'red-blue',
        ),
      })),
    };
    const { moves } = toPokemonDetail(
      oldGamesOnly,
      bulbasaurSpeciesDto,
      bulbasaurChainDto,
    );

    expect(moves.map(({ name }) => name)).toEqual([
      'tackle',
      'growl',
      'leech-seed',
      'vine-whip',
      'poison-powder',
      'razor-leaf',
      'growth',
      'sleep-powder',
      'solar-beam',
    ]);
  });
});
