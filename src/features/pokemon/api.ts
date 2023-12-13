import axios from 'axios';
import * as path from 'path';
import { PokemonConstraint, SinglePokemonResponse } from './types';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { checkPokemonConstraint } from './utils/constraintUtils';
export function getPokemon(idOrName: string) {
    return axios
        .get<SinglePokemonResponse>(
            'https://pokeapi.co/api/v2/pokemon/' + idOrName
        )
        .then(({ data }) => {
            return {
                name: data.name,
                sprite: data.sprites.front_default,
                types: data.types,
            };
        });
}

/**
 *  Fetches a specific Pokemon, and its parent species by name.
 * @param p The PokemonClient to use
 * @param pokemonName The kebab-case name of the Pokemon. If a pokemon has specific variants, this will be the name of the variant.
 * @returns A tuple array containing the Pokemon and PokemonSpecies resource.
 */
export async function getPokemonAndSpeciesByName(
    p: PokemonClient,
    pokemonName: string
) {
    console.log('Fetching', pokemonName);
    const pokemon = await p.getPokemonByName(pokemonName);
    const pokemonSpecies = await p.getPokemonSpeciesByName(
        pokemon.species.name
    );
    return [pokemon, pokemonSpecies] as const;
}

export async function fetchPokemonConstraints(
    p: PokemonClient,
    pokemonName: string,
    cs: PokemonConstraint[]
) {
    const [pokemon, pokemonSpecies] = await getPokemonAndSpeciesByName(
        p,
        pokemonName
    );
    const results = await Promise.all(
        cs.map((c) => checkPokemonConstraint(c, pokemon, pokemonSpecies))
    );
    return results.every((v) => v);
}

export async function getLatestGame(): Promise<PokemonConstraint[]> {
    return [];
}

export async function getMatchingPokemon(
    constraint: PokemonConstraint
): Promise<Pokemon[]> {
    return [];
}
