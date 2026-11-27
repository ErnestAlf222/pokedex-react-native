import {
  GENDERLESS_RATE,
  GENDER_RATE_STEPS,
  LEVEL_UP_LEARN_METHOD,
  MAX_DETAIL_MOVES,
  MOVE_VERSION_GROUPS,
  PERCENT,
  POKEMON_SHINY_IMAGE_URL_TEMPLATE,
  pickLocalizedText,
} from '../../core';
import { PokemonDetail, PokemonGender, PokemonMove } from '../../domain';
import {
  EvolutionChainDto,
  PokemonDto,
  PokemonMoveDto,
  PokemonSpeciesDto,
} from '../models';
import { toEvolutionStages } from './evolution-chain-mapper';
import { buildImageUrl } from './pokemon-mapper';

// Calcula el porcentaje de hembras y machos; null si la especie no tiene género.
const toGender = (genderRate: number): PokemonGender | null => {
  if (genderRate === GENDERLESS_RATE) {
    return null;
  }
  const female = (genderRate / GENDER_RATE_STEPS) * PERCENT;
  return { female, male: PERCENT - female };
};

// Movimientos por nivel que el Pokémon aprende en un grupo de versiones.
const levelUpMoves = (
  moves: PokemonMoveDto[],
  versionGroup: string,
): PokemonMove[] =>
  moves.flatMap(({ move, version_group_details }) =>
    version_group_details
      .filter(
        detail =>
          detail.version_group.name === versionGroup &&
          detail.move_learn_method.name === LEVEL_UP_LEARN_METHOD,
      )
      .map(detail => ({ name: move.name, level: detail.level_learned_at })),
  );

// Toma el grupo de versiones más reciente en el que aprende movimientos por nivel, ordenados por nivel y limitados.
const toMoves = (moves: PokemonMoveDto[]): PokemonMove[] =>
  (
    [...MOVE_VERSION_GROUPS]
      .reverse()
      .map(versionGroup => levelUpMoves(moves, versionGroup))
      .find(list => list.length > 0) ?? []
  )
    .sort((a, b) => a.level - b.level)
    .slice(0, MAX_DETAIL_MOVES);

// Combina Pokémon, especie y cadena evolutiva en un PokemonDetail; el nombre es el de la especie, igual que en el listado.
export const toPokemonDetail = (
  pokemon: PokemonDto,
  species: PokemonSpeciesDto,
  chain: EvolutionChainDto,
): PokemonDetail => {
  const stats = pokemon.stats.map(({ base_stat, stat }) => ({
    name: stat.name,
    value: base_stat,
  }));

  return {
    id: pokemon.id,
    name: pokemon.species.name,
    imageUrl: buildImageUrl(pokemon.id),
    shinyImageUrl: buildImageUrl(pokemon.id, POKEMON_SHINY_IMAGE_URL_TEMPLATE),
    types: pokemon.types.map(({ type }) => type.name),
    stats,
    statsTotal: stats.reduce((total, { value }) => total + value, 0),
    abilities: pokemon.abilities.map(({ ability, is_hidden }) => ({
      name: ability.name,
      isHidden: is_hidden,
    })),
    height: pokemon.height,
    weight: pokemon.weight,
    description: pickLocalizedText(
      species.flavor_text_entries,
      ({ flavor_text }) => flavor_text,
    ),
    category: pickLocalizedText(species.genera, ({ genus }) => genus),
    captureRate: species.capture_rate,
    gender: toGender(species.gender_rate),
    eggGroups: species.egg_groups.map(({ name }) => name),
    habitat: species.habitat?.name ?? null,
    baseHappiness: species.base_happiness,
    growthRate: species.growth_rate.name,
    baseExperience: pokemon.base_experience,
    isLegendary: species.is_legendary,
    isMythical: species.is_mythical,
    isBaby: species.is_baby,
    moves: toMoves(pokemon.moves),
    evolutions: toEvolutionStages(chain),
  };
};
