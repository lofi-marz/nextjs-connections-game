import { describe, it, expect } from 'vitest';
import { PokemonClient } from 'pokenode-ts';
import {
    GenConstraint,
    LegendaryConstraint,
    MonotypeConstraint,
    TypeConstraint,
} from '../types';
import {
    isType,
    isMonotype,
    isGen,
    isLegendary,
    checkPokemonConstraint
} from './constraintUtils';
//TODO: Refactor these
const p = new PokemonClient();

describe('Pokémon Functions', () => {
    it('should correctly identify if a Pokémon is of a certain type', async () => {
        const electricTypePokemon = await p.getPokemonByName('pikachu');
        const result = isType(electricTypePokemon, 'electric');
        expect(result).toBe(true);
    });

    it('should correctly identify if a Pokémon is monotype', async () => {
        const monotypePokemon = await p.getPokemonByName('charmander');
        const result = isMonotype(monotypePokemon);
        expect(result).toBe(true);
    });

    it('should correctly identify if a Pokémon belongs to a specific generation', async () => {
        const pokemon = await p.getPokemonSpeciesByName('charizard');
        const result = isGen(pokemon, 1); // Assuming 1 is the generation for Bulbasaur
        expect(result).toBe(true);
    });

    it('should correctly identify if a Pokémon is legendary or mythical', async () => {
        const pokemon = await p.getPokemonSpeciesByName('mew');
        const result = isLegendary(pokemon);
        expect(result).toBe(true);
    });
});

describe('Pokemon Constraint Checker', () => {
    it('should correctly check a gen constraint', async () => {
        const pokemonName = 'bulbasaur';
        const pokemon = await p.getPokemonByName(pokemonName);
        const pokemonSpecies = await p.getPokemonSpeciesByName(pokemonName);
        const constraint: GenConstraint = { type: 'gen', value: 1 }; // Assuming 1 is the generation for Bulbasaur
        const result = await checkPokemonConstraint(
            constraint,
            pokemon,
            pokemonSpecies
        );
        expect(result).toBe(true);
    });

    it('should correctly check a legendary constraint', async () => {
        const pokemonName = 'mew';
        const pokemon = await p.getPokemonByName(pokemonName);
        const pokemonSpecies = await p.getPokemonSpeciesByName(pokemonName);
        const constraint: LegendaryConstraint = {
            type: 'legendary',
            value: true,
        };
        const result = await checkPokemonConstraint(
            constraint,
            pokemon,
            pokemonSpecies
        );
        expect(result).toBe(true);
    });

    it('should correctly check a monotype constraint', async () => {
        const pokemonName = 'mew';
        const pokemon = await p.getPokemonByName(pokemonName);
        const pokemonSpecies = await p.getPokemonSpeciesByName(pokemonName);
        const constraint: MonotypeConstraint = {
            type: 'monotype',
            value: true,
        };
        const result = checkPokemonConstraint(
            constraint,
            pokemon,
            pokemonSpecies
        );
        expect(result).toBe(true);
    });

    it('should correctly check a type constraint', async () => {
        const pokemonName = 'charizard';
        const pokemon = await p.getPokemonByName(pokemonName);
        const pokemonSpecies = await p.getPokemonSpeciesByName(pokemonName);
        const constraint: TypeConstraint = { type: 'type', value: 'fire' };
        const result = await checkPokemonConstraint(
            constraint,
            pokemon,
            pokemonSpecies
        );
        expect(result).toBe(true);
    });
});

/*describe('Pokedex', () => {
    it('should contain lowercase English names', () => {
        const lowercaseNames = pokedex.every(
            (pokemon) => pokemon.value === pokemon.value.toLowerCase()
        );
        expect(lowercaseNames).toBe(true);
    });

    it('should contain sprite information for each Pokémon', () => {
        const allHaveSprites = pokedex.every((pokemon) => pokemon.sprite);
        expect(allHaveSprites).toBe(true);
    });
});*/
