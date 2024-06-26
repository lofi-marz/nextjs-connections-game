'use client';
import { useGameStore } from '@/features/game/provider';
import { cn } from '@/utils/utils';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { countRemainingGuesses } from '../../utils';
import { GameControls } from './GameControls';
import { GameGrid } from './GameGrid';
function easeInBack(x: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return c3 * x * x * x - c1 * x * x;
}
function easeInOutBack(x: number): number {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
const shotIconVariants: Variants = {
    hide: {
        scale: 0,
        opacity: 0,
        transition: {
            ease: [0.17, 0.67, 0.83, 0.67],
            duration: 0.5,
            opacity: { ease: 'easeIn', duration: 2 },
        },
    },
    show: { scale: 1, opacity: 1 },
};
function GameRemainingShots() {
    const shots = useGameStore((state) => [
        ...new Array(countRemainingGuesses(state)).fill(true),
    ]);
    console.log(shots);
    return (
        <motion.div
            className="grid grid-cols-4 items-center justify-center gap-2"
            layout
            title={`${shots.length} guesses remaining`}>
            <AnimatePresence mode="sync">
                {shots.map((full, i) => (
                    <motion.div
                        className={cn(
                            'aspect-square h-6 rounded-full bg-theme-invert transition-all',
                            full || 'bg-red-500'
                        )}
                        key={`shot-${i}`}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        layout
                        variants={shotIconVariants}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
export function GameWindow() {
    return (
        <div className="mx-auto flex w-full grow flex-col items-center justify-center">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-6 px-4 pb-12 sm:p-12 lg:max-w-3xl 2xl:max-w-2xl">
                <GameGrid />
                <GameRemainingShots />
                <GameControls />
            </div>
        </div>
    );
}
