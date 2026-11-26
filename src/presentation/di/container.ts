import {
  PokemonRemoteDataSource,
  PokemonRepositoryImpl,
} from '../../data';
import {
  GetAllPokemonUseCase,
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
};
