import { describe, it } from 'vitest';
import { PokemonConstraint } from './types';
import { getMatchingPokemon, getPokemonAndSpeciesByName } from './api';
import { PokemonClient } from 'pokenode-ts';
describe('Pokemon API Functions', () => {
    const constraint1: PokemonConstraint = { type: 'type', value: 'fire' };
    const constraint2: PokemonConstraint = {
        type: 'type',
        value: 'fighting',
    };
    const p = new PokemonClient();
    it('Correctly gets pokemon that match constraints', async () => {
        const pokemon = await getMatchingPokemon(constraint1);
        expect(pokemon.length);
    });

    it('getPokemonAndSpeciesByName correctly matches pokemon with multiple forms to pokemon species', async () => {
        const testPokemon = 'aegislash-blade';
        const [pokemon, pokemonSpecies] = await getPokemonAndSpeciesByName(
            p,
            testPokemon
        );
        expect(pokemon.name).toBe(testPokemon);
        expect(pokemon.species.name).toBe(pokemonSpecies.name);
    });
});
