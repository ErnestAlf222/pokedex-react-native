import { PokemonTypeIndex } from '../../domain';
import { TypeDto } from '../models';
import { extractId } from './pokemon-mapper';

// Construye el índice id → tipos (slot 1 primero), solo con los ids de especies dados.
export const toPokemonTypeIndex = (
  types: TypeDto[],
  speciesIds: ReadonlySet<number>,
): PokemonTypeIndex =>
  types
    .flatMap(({ name, pokemon }) =>
      pokemon.map(({ slot, pokemon: { url } }) => ({
        id: extractId(url),
        slot,
        type: name,
      })),
    )
    .filter(({ id }) => speciesIds.has(id))
    .sort((a, b) => a.slot - b.slot)
    .reduce<PokemonTypeIndex>((index, { id, type }) => {
      index[id] = [...(index[id] ?? []), type];
      return index;
    }, {});
