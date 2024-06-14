import { toastQueue } from '@/components/toast';
import { shuffleArray } from '@/utils/utils';
import { MAX_SELECTED } from 'consts';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { GameState, GameStore } from './types';
import {
	countRemainingGuesses,
	createEmptyGame,
	findGroupIndexesForGuess,
	findMatchingGroup,
	gamesAreEqual,
	getHintMessage,
} from './utils';

export const createGameStore = (initState: GameState) => createStore<GameStore>()(
    persist(
        (set) => ({
            ...initState,
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
                    const indexes = findGroupIndexesForGuess(members, state);
                    const hintMessage = getHintMessage(indexes);
                    console.log('Hint message:', hintMessage);
                    toastQueue.add(hintMessage, { timeout: 2000 });
                    if (match) {
                        console.log('Match!', match);
                        return {
                            ...state,
                            selected: [],
                            guesses: [...state.guesses, members],
                            grid: state.grid.filter(
                                (v) => !members!.includes(v)
                            ),
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
            initializeGame: (day, groups) =>
                set((state) => ({
                    ...createEmptyGame(),
                    day,
                    groups,
                    grid: shuffleArray(
                        groups.flatMap((group) => group.members)
                    ),
                })),
        }),
        {
            name: 'pokemon-connections-game', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			merge: (persisted,  current) => {
				if (gamesAreEqual(persisted as GameState, current as GameState)) return current;
				return ({...current,  ...(persisted as GameState)});
			},
        }
    )
);

