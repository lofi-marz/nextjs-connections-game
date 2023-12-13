import { Pokemon, Stat } from 'pokenode-ts';
import pokedexJson from './assets/pokedex.json';
import { POKEMON_REGIONS } from './utils';

export type PokemonRegion = (typeof POKEMON_REGIONS)[number];
export type PokemonNameInfo = {
    name: string;
    region?: string;
    variant?: string;
};

export type PokemonType =
    | 'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy';

export type PokemonGen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type PokemonResponse = {
    results: { name: string }[];
};

export type SinglePokemonResponse = {
    name: string;
    sprites: {
        front_default: string;
    };
    types: { slot: number; type: { name: string } }[];
};

type StatName = Stat['name'];
export type PokemonStatName = Exclude<StatName, 'accuracy' | 'evasion'>;

type Constraint<T extends string, U> = { type: T; value: U };

export type TypeConstraint = Constraint<'type', PokemonType>;

export type GenConstraint = Constraint<'gen', PokemonGen>;

export type LegendaryConstraint = Constraint<'legendary', boolean>;

export type MonotypeConstraint = Constraint<'monotype', boolean>;

export type MaxStatConstraint = Constraint<'max-stat', PokemonStatName>;

export type PokemonConstraint =
    | TypeConstraint
    | GenConstraint
    | LegendaryConstraint
    | MonotypeConstraint
    | MaxStatConstraint;
