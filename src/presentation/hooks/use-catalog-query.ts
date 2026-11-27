import { useQuery } from '@tanstack/react-query';
import { CATALOG_GC_TIME_MS, CATALOG_STALE_TIME_MS } from '../../core';

// Consulta un elemento del catálogo (movimiento, habilidad, generaciones…) con caché larga; la clave se comparte y puede pedirse solo cuando hace falta.
export const useCatalogQuery = <T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<T>,
  enabled = true,
) =>
  useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime: CATALOG_STALE_TIME_MS,
    gcTime: CATALOG_GC_TIME_MS,
  });
