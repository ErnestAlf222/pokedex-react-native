import { NamedResourceDto } from './named-resource-dto';

export interface ChainLinkDto {
  species: NamedResourceDto;
  evolves_to: ChainLinkDto[];
}

export interface EvolutionChainDto {
  id: number;
  chain: ChainLinkDto;
}
