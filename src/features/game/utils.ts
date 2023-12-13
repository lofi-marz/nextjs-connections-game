import { MAX_GUESSES } from 'consts';
import { GameGroup, GameState } from './types';

export function findMatchingGroup(guess: string[], state: GameState) {
    return state.groups.find(({ members }) =>
        members.every((m) => guess.includes(m))
    );
}

export function getMatchingGroups(state: GameState) {
    return state.guesses.reduce((acc, curr) => {
        const match = findMatchingGroup(curr, state);
        if (match) return [...acc, match];
        return acc;
    }, [] as GameGroup[]);
}

export function countRemainingGuesses(state: GameState) {
    return (
        MAX_GUESSES - (state.guesses.length - getMatchingGroups(state).length)
    );
}
