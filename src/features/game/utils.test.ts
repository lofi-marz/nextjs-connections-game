import { describe, expect, it } from 'vitest';
import {
	CORRECT_GUESS_MESSAGE,
	INCORRECT_GUESS_MESSAGE,
	ONE_WRONG_GUESS_MESSAGE,
} from './consts';
import { GameState } from './types';
import { checkGameEndState, createTestGame, gamesAreEqual, getHintMessage } from './utils';

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

    describe('Guess Message', () => {
        it('produces correct message for correct guess', () => {
            const group = [1, 1, 1, 1];
            expect(getHintMessage(group)).toBe(CORRECT_GUESS_MESSAGE);
        });
        it('produces correct message for guess with 1 wrong', () => {
            const group = [0, 1, 1, 1];
            expect(getHintMessage(group)).toBe(ONE_WRONG_GUESS_MESSAGE);
        });
        it('produces correct message for more than 1 wrong', () => {
            const group = [1, 0, 0, 2];
            expect(getHintMessage(group)).toBe(INCORRECT_GUESS_MESSAGE);
        });
    });

	describe('gamesAreEqual', () => {
		it('returns true for equal games', () => {
			const game1 = createTestGame();
			const game2 = createTestGame();
			expect(gamesAreEqual(game1, game2)).toBe(true);
		});
		it('returns false for unequal games', () => {
			const game1 = createTestGame();
			const game2 = createTestGame();
			game2.groups[0].members = ['venusaur', 'bellsprout', 'roserade', 'oddish'];
			expect(gamesAreEqual(game1, game2)).toBe(false);
		});
	})
});
