'use client';
import { toastQueue } from '@/components/toast';
import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { FaClipboard } from 'react-icons/fa6';
import { useGameStore } from '../provider';
import { GameEndState } from '../types';
import { gameToShareMessage } from '../utils';
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

    const copy = () => {
        try {
            navigator.clipboard.writeText(shareMessage);
            toastQueue.add('📋 Share message copied', { timeout: 2000 });
        } catch (e) {
            console.log('Error copying message');
        }
    };

    const onShare = () => {
        if (isDesktop || !navigator.share) return copy();
		try {
			navigator.share({
				title: 'Pokennections',
				text: shareMessage,
				url: 'https://pokennections.vercel.app',
			});
			toastQueue.add('📋 Share message copied', { timeout: 2000 });
		}  catch (e) {
            console.log('Error copying message');
        }
        

    };
    return (
        <DialogOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="relative whitespace-pre rounded-xl bg-dark/10 p-5 font-mono text-xs sm:text-base">
                    <Button
                        className="absolute right-2 top-2 gap-2 font-semibold"
                        onPress={onShare}>
                        Copy <FaClipboard />
                    </Button>
                    {shareMessage}
                </div>
            </DialogContent>
        </DialogOverlay>
    );
}
