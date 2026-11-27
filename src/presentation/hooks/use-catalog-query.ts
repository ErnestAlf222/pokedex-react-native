import { useQuery } from '@tanstack/react-query';
import { CATALOG_GC_TIME_MS, CATALOG_STALE_TIME_MS } from '../../core';

// Consulta un elemento del catálogo (movimiento o habilidad) con caché larga; la clave por nombre se comparte entre Pokémon.
export const useCatalogQuery = <T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
) =>
  useQuery({
    queryKey,
    queryFn,
    staleTime: CATALOG_STALE_TIME_MS,
    gcTime: CATALOG_GC_TIME_MS,
  });
