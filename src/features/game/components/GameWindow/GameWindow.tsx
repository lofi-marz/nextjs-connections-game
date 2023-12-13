import { useState } from 'react';
import { GameGrid } from './GameGrid';
import { GameControls } from './GameControls';
import { useGameStore } from '../../stores';
import { countRemainingGuesses } from '../../utils';

function GameRemainingShots() {
    const shots = useGameStore((state) => countRemainingGuesses(state));
    return <div>{shots}</div>;
}
export function GameWindow() {
    return (
        <div className="mx-auto flex w-full flex-col">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-6 p-4 sm:p-12">
                <GameGrid />
                <GameRemainingShots />
                <GameControls />
            </div>
        </div>
    );
}
