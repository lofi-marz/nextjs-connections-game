import { ModalDialog } from '@/components/ModalDialog';
import { GameEndState, GameState } from '../types';
import { useGameStore } from '../stores';
import { gameToShareMessage } from '../utils';
import { FaClipboard } from 'react-icons/fa6';
import { Button } from 'react-aria-components';
import { useEffect, useState } from 'react';

export function GameEndDialog({
    day,
    gameEndState,
}: {
    day: number;
    gameEndState: GameEndState;
}) {
    const game = useGameStore((state) => state);
    console.log('End state:', gameEndState);
    const hasWon = gameEndState === 'win';

    useEffect(() => {
        if (gameEndState) {
            setIsOpen(true);
            console.log('Opening');
        }
    }, [gameEndState]);
    const title = hasWon ? 'Congrats! 🎉' : 'Nice try...';
    const shareMessage = gameToShareMessage(game, day, hasWon);
    const [isOpen, setIsOpen] = useState(false);

    const copy = () => navigator.clipboard.writeText(shareMessage);
    return (
        <ModalDialog title={title} isOpen={isOpen} onOpenChange={setIsOpen}>
            <div className="relative whitespace-pre rounded-xl bg-dark/10 p-5 font-mono">
                <Button
                    className="absolute right-2 top-2 flex flex-row items-center justify-center rounded-xl bg-primary-400 px-4 py-2 font-semibold transition-all hover:scale-105 pressed:scale-95"
                    onPress={copy}>
                    Copy <FaClipboard />
                </Button>
                {shareMessage}
            </div>
        </ModalDialog>
    );
}
