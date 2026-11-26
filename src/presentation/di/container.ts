import {
  PokemonRemoteDataSource,
  PokemonRepositoryImpl,
} from '../../data';
import { GetPokemonDetailUseCase, GetPokemonPageUseCase } from '../../domain';

const pokemonRepository = new PokemonRepositoryImpl(
  new PokemonRemoteDataSource(),
);

export const container = {
  getPokemonPageUseCase: new GetPokemonPageUseCase(pokemonRepository),
  getPokemonDetailUseCase: new GetPokemonDetailUseCase(pokemonRepository),
};
