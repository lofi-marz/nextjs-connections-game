'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore } from 'zustand'
import { createGameStore } from './stores'
import { GameState, GameStore } from './types'


export type GameStoreApi = ReturnType<typeof createGameStore>

export const GameStoreContext = createContext<GameStoreApi | undefined>(
  undefined,
)

export type GameStoreProviderProps = {
  children: ReactNode;
  value: GameState;
}

export const GameStoreProvider = ({
  children,
  value
}: GameStoreProviderProps) => {
	
  const storeRef = useRef<GameStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createGameStore(value);
  }

  return (
    <GameStoreContext.Provider value={storeRef.current}>
      {children}
    </GameStoreContext.Provider>
  )
}

export const useGameStore = <T,>(
  selector: (store: GameStore) => T,
): T => {
  const gameStoreContext = useContext(GameStoreContext);

  if (!gameStoreContext) {
    throw new Error('useGameStore must be used within GameStoreProvider')
  }

  return useStore(gameStoreContext, selector)
}