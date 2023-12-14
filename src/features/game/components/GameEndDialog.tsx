import { ModalDialog } from '@/components/ModalDialog';
import { GameEndState, GameState } from '../types';
import { useGameStore } from '../stores';
import { gameToShareMessage } from '../utils';
import { FaClipboard } from 'react-icons/fa6';

export function GameEndDialog({
    day,
    gameEndState,
}: {
    day: number;
    gameEndState: GameEndState;
}) {
    const game = useGameStore();

    const hasWon = gameEndState === 'win';

    const title = hasWon ? 'Congrats! 🎉' : 'Nice try...';
    const shareMessage = gameToShareMessage(game, day, hasWon);

    console.log(game);
    console.log(shareMessage);

    const copy = () => navigator.clipboard.writeText(shareMessage);
    return (
        <ModalDialog
            title={title}
            isOpen={Boolean(gameEndState)}
            onOpenChange={() => {}}
            hideClose>
            <div className="relative whitespace-pre rounded-xl bg-dark/10 p-5 font-mono">
                <button
                    className="absolute right-2 top-2 flex flex-row items-center justify-center rounded-xl bg-primary-400 px-4 py-2 font-semibold transition-all duration-75 active:brightness-50 hover:brightness-150"
                    onClick={copy}>
                    Copy <FaClipboard />
                </button>
                {shareMessage}
            </div>
        </ModalDialog>
    );
}
