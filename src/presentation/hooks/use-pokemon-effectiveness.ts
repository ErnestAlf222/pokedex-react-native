import { useQuery } from '@tanstack/react-query';
import {
  EFFECTIVENESS_GC_TIME_MS,
  EFFECTIVENESS_STALE_TIME_MS,
  POKEMON_QUERY_KEYS,
} from '../../core';
import { container } from '../di';

// Consulta las debilidades de una combinación de tipos; la clave usa los tipos ordenados y se pide solo con el detalle cargado.
export const usePokemonEffectiveness = (
  typeNames: string[],
  enabled: boolean,
) =>
  useQuery({
    queryKey: POKEMON_QUERY_KEYS.effectiveness(typeNames),
    queryFn: () => container.getTypeEffectivenessUseCase.execute(typeNames),
    staleTime: EFFECTIVENESS_STALE_TIME_MS,
    gcTime: EFFECTIVENESS_GC_TIME_MS,
    enabled,
  });
