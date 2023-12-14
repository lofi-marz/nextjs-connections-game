import { MAX_GUESSES } from 'consts';
import { GameDifficulty, GameGroup, GameState } from './types';

export function findMatchingGroup(guess: string[], state: GameState) {
    return state.groups.find(({ members }) =>
        members.every((m) => guess.includes(m))
    );
}

function findBelongingGroup(word: string, state: GameState) {
    return state.groups.find(({ members }) => members.includes(word));
}

function toEmoji(difficulty?: GameDifficulty) {
    const emojis = ['🟩', '🟨', '🟧', '🟥']; //Separate because secretly they aren't 1 character
    return emojis[difficulty ?? 0];
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

export function gameToShareMessage(
    game: GameState,
    day: number,
    hasWon: boolean
) {
    const title = 'Pokennections #' + (day + 1);
    const { guesses } = game;
    const guessString = guesses
        .map((row) =>
            row
                .map((w) => toEmoji(findBelongingGroup(w, game)?.difficulty))
                .join('')
        )
        .join('\n');

    const shareMessage = [
        title,
        guessString,

        'Play here: https://degreedle.vercel.app',
    ].join('\n');

    return shareMessage;
}
