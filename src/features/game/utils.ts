import { MAX_GUESSES } from '../../consts';
import {
    CORRECT_GUESS_MESSAGE,
    INCORRECT_GUESS_MESSAGE,
    ONE_WRONG_GUESS_MESSAGE,
} from './consts';
import { GameDifficulty, GameGroup, GameState } from './types';

export function findMatchingGroup(guess: string[], state: GameState) {
    return state.groups.find(({ members }) =>
        members.every((m) => guess.includes(m))
    );
}

export function findGroupIndexesForGuess(guess: string[], state: GameState) {
    return guess.map((w) => findBelongingGroupIndex(w, state));
}

function countFrequencies<T extends string | number>(array: T[]) {
    return array.reduce(
        (acc, item) => {
            acc[item] = (acc[item] ?? 0) + 1;
            return acc;
        },
        {} as Record<T, number>
    );
}
export function getHintMessage(guessIndexes: number[]) {
    const frequencies = Object.values(countFrequencies(guessIndexes));
    if (frequencies.some((v) => v === guessIndexes.length))
        return CORRECT_GUESS_MESSAGE;
    if (frequencies.some((v) => v === guessIndexes.length - 1))
        return ONE_WRONG_GUESS_MESSAGE;
    return INCORRECT_GUESS_MESSAGE;
}

function findBelongingGroupIndex(word: string, state: GameState) {
    return state.groups.findIndex(({ members }) => members.includes(word));
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

        'Play here: https://pokennections.vercel.app/',
    ].join('\n');

    return shareMessage;
}

export function checkGameEndState(state: GameState) {
    if (countRemainingGuesses(state) === 0) return 'lose';
    if (
        state.groups.every(({ members }) =>
            state.guesses.find((guess) =>
                members.every((m) => guess.includes(m))
            )
        )
    )
        return 'win';
    return null;
}
export function createEmptyGame(): GameState {
    return {
        day: 0,
        groups: [],
        guesses: [],
        selected: [],
        grid: [],
    };
}
export function createTestGame() {
    const emptyGame: GameState = {
        day: 0,
        groups: [],
        guesses: [],
        selected: [],
        grid: [],
    };
    let testGame: GameState = {
        ...emptyGame,
        groups: [
            {
                members: ['bulbasaur', 'bellsprout', 'roserade', 'oddish'],
                reason: 'Grass-Poison Pokemon',
                difficulty: 0,
            },
            {
                members: ['venusaur', 'oinkologne', 'weavile', 'croagunk'],
                reason: 'Gender Differences',
                difficulty: 1,
            },
            {
                members: ['togepi', 'pichu', 'snom', 'golbat'],
                reason: 'Evolve when they are leveled up with enough friendship',
                difficulty: 2,
            },
            {
                members: ['weedle', 'kakuna', 'beedrill', 'pidgey'],
                reason: 'Gen I Pokemon',
                difficulty: 3,
            },
        ],
    };

    testGame.grid = testGame.groups.flatMap((group) => group.members);
    return testGame;
}
