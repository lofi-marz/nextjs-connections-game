import { describe, it, expect } from 'vitest';
import { GameState } from './types';
import { checkGameEndState } from './utils';

const emptyGame: GameState = {
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

describe('Game Utils', () => {
    it('checkGameEndState correctly recognises loss', () => {
        const winningGame: GameState = {
            ...testGame,
            guesses: testGame.groups.map(({ members }) => members),
        };
        expect(checkGameEndState(winningGame)).toBe('win');
    });
    it('checkGameEndState correctly recognises loss', () => {
        const losingGame: GameState = {
            ...testGame,
            guesses: [[], [], [], []],
        };
        expect(checkGameEndState(losingGame)).toBe('lose');
    });
    it('checkGameEndState correctly recognises continue', () => {
        expect(checkGameEndState(testGame)).toBeNull();
    });
});
