import { PokemonNameInfo, PokemonRegion } from '../types';
import nameToSpeciesJson from '../assets/pokemonToSpecies.json';
export const POKEMON_REGIONS = ['hisui', 'paldea', 'alola', 'galar'] as const;

const POKEMON_NAMES_WITH_DASHES = [
    'ho-oh',
    'porygon-z',
    'jangmo-o',
    'hakamo-o',
    'kommo-o',
    'wo-chien',
    'chien-pao',
    'ting-lu',
    'chi-yu',
];

function isUselessVariant(pokemon: string) {
    const uselessVariantsregex =
        /\b((pikachu|greninja|minior|eevee|squawkabilly|basculegion)-.*)|(.*(gmax|totem))\b/g;
    return uselessVariantsregex.test(pokemon);
}

export function parsePokemonName(pokemon: string): PokemonNameInfo {
    const pokemonSpecies =
        nameToSpeciesJson[pokemon as keyof typeof nameToSpeciesJson];
    const name = POKEMON_NAMES_WITH_DASHES.includes(pokemonSpecies)
        ? pokemonSpecies
        : pokemonSpecies.replaceAll('-', ' ');
    const variantWords = pokemon
        .replace(pokemonSpecies, '')
        .slice(1)
        .split('-');

    const regionI = variantWords.findIndex((w) =>
        POKEMON_REGIONS.includes(w as PokemonRegion)
    );
    const region = variantWords[regionI];
    const variant = variantWords.filter((_, i) => i !== regionI).join(' ');

    return {
        name,
        ...(region && { region }),
        ...(variant !== '' && { variant }),
    };
}

export function regionToAdjective(region: string) {
    if (!POKEMON_REGIONS.includes(region as PokemonRegion)) return '';
    const map = {
        hisui: 'hisuian',
        paldea: 'paldean',
        alola: 'alolan',
        galar: 'galarian',
    } satisfies Record<PokemonRegion, string>;
    return map[region as PokemonRegion];
}
