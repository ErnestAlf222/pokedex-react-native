import { EvolutionStage } from '../../domain';
import { ChainLinkDto, EvolutionChainDto } from '../models';
import { toPokemonSummary } from './pokemon-mapper';

// Aplana los eslabones nivel por nivel, soportando ramificaciones.
const flattenByStage = (links: ChainLinkDto[]): EvolutionStage[] =>
  links.length === 0
    ? []
    : [
        ...links.map(link => toPokemonSummary(link.species)),
        ...flattenByStage(links.flatMap(link => link.evolves_to)),
      ];

// Convierte la cadena evolutiva en una lista de etapas ordenada por nivel.
export const toEvolutionStages = ({
  chain,
}: EvolutionChainDto): EvolutionStage[] => flattenByStage([chain]);
