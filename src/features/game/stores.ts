import { create } from 'zustand';

import { GameState, GameStore } from './types';
import { MAX_GUESSES, MAX_SELECTED } from 'consts';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getGameRound, shuffleArray } from '@/utils/utils';
import { countRemainingGuesses, findMatchingGroup } from './utils';
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

testGame.grid = testGame.groups.flatMap((group) => group.members);

export const useGameStore = create<GameStore>()((set) => ({
    ...testGame,
    select: (word: string) =>
        set((state) => {
            if (countRemainingGuesses(state) <= 0) return state;
            if (state.selected.includes(word)) {
                return {
                    ...state,
                    selected: state.selected.filter((w) => w != word),
                };
            }
            if (state.selected.length === MAX_SELECTED) return state;
            return { ...state, selected: [...state.selected, word] };
        }),
    guess: (members) =>
        set((state) => {
            if (countRemainingGuesses(state) <= 0) return state;
            if (!members) members = state.selected;
            if (members.length < MAX_SELECTED) return state;
            const match = findMatchingGroup(members, state);

            if (match) {
                console.log('Match!', match);
                return {
                    ...state,
                    selected: [],
                    guesses: [...state.guesses, members],
                    grid: state.grid.filter((v) => !members!.includes(v)),
                };
            }
            return {
                ...state,
                selected: [],
                guesses: [...state.guesses, members],
            };
        }),

    shuffle: () =>
        set((state) => ({ ...state, grid: shuffleArray(state.grid) })),
    deselectAll: () => set((state) => ({ ...state, selected: [] })),
}));
