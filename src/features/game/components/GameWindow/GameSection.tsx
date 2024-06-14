'use client';

import { getDailyGame } from '../../api';
import { useGameStore } from '../../provider';
import { checkGameEndState } from '../../utils';
import { GameEndDialog } from '../GameEndDialog';
import { GameWindow } from './GameWindow';

export function GameSection() {
	const dailyGame = getDailyGame();
	const storedGame = useGameStore((state) => state);
	return <><GameWindow /><GameEndDialog day={storedGame.day} gameEndState={checkGameEndState(storedGame)} /></>
}