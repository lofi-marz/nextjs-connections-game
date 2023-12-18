import { create } from 'zustand';

import { GameGroup, GameState, GameStore } from './types';
import { MAX_GUESSES, MAX_SELECTED } from 'consts';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getGameRound, shuffleArray } from '@/utils/utils';
import {
    countRemainingGuesses,
    createEmptyGame,
    createTestGame,
    findMatchingGroup,
} from './utils';
import { useEffect, useState } from 'react';

export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            ...createEmptyGame(),
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
        }
    )
);

export const useGameIsHydrated = () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Note: This is just in case you want to take into account manual rehydration.
        // You can remove the following line if you don't need it.
        const unsubHydrate = useGameStore.persist.onHydrate(() =>
            setHydrated(false)
        );

        const unsubFinishHydration = useGameStore.persist.onFinishHydration(
            () => setHydrated(true)
        );

        setHydrated(useGameStore.persist.hasHydrated());

        return () => {
            unsubHydrate();
            unsubFinishHydration();
        };
    }, []);

    return hydrated;
};
