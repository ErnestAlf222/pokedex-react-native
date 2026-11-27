import {
  PokemonRemoteDataSource,
  PokemonRepositoryImpl,
} from '../../data';
import {
  GetAbilityDetailUseCase,
  GetAllPokemonUseCase,
  GetMoveDetailUseCase,
  GetPokemonDetailUseCase,
  GetPokemonPageUseCase,
  GetPokemonTypeIndexUseCase,
  GetTypeEffectivenessUseCase,
} from '../../domain';

const pokemonRepository = new PokemonRepositoryImpl(
  new PokemonRemoteDataSource(),
);

export const container = {
  getPokemonPageUseCase: new GetPokemonPageUseCase(pokemonRepository),
  getPokemonDetailUseCase: new GetPokemonDetailUseCase(pokemonRepository),
  getAllPokemonUseCase: new GetAllPokemonUseCase(pokemonRepository),
  getPokemonTypeIndexUseCase: new GetPokemonTypeIndexUseCase(pokemonRepository),
  getTypeEffectivenessUseCase: new GetTypeEffectivenessUseCase(pokemonRepository),
  getMoveDetailUseCase: new GetMoveDetailUseCase(pokemonRepository),
  getAbilityDetailUseCase: new GetAbilityDetailUseCase(pokemonRepository),
};
