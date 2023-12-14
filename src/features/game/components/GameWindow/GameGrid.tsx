import { PokemonSprite } from '@/features/pokemon/components/PokemonSprite';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { WithChildrenProps, WithClassNameProps } from 'types';
import { useGameStore } from '../../stores';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { GameGroup } from '../../types';
import {
    findMatchingGroup,
    gameToShareMessage,
    getMatchingGroups,
} from '../../utils';
import { Button } from 'react-aria-components';

const gameCellVariants: Variants = {
    hide: {},
    show: {},
};
const MotionButton = motion(Button);
function GameCell({
    value,
    children,
    onClick,
    selected,
}: {
    value: string;
    onClick: (word: string) => void;
    selected: boolean;
} & WithChildrenProps) {
    return (
        <MotionButton
            className={cn(
                'relative flex h-full w-full items-center justify-center rounded border-primary-400 bg-theme-invert text-xs uppercase text-theme transition-all hover:border-4 pressed:scale-95  sm:text-base lg:text-lg',
                selected && 'bg-primary-400'
            )}
            onPress={() => onClick(value)}
            initial="hide"
            animate="show"
            variants={gameCellVariants}>
            {children}
        </MotionButton>
    );
}

export function PokemonCellContent({ pokemon }: { pokemon: string }) {
    return (
        <motion.div
            className="relative flex h-full w-full items-center justify-center"
            variants={{
                hide: { opacity: 0 },
                show: { opacity: 1 },
            }}>
            <PokemonSprite pokemon={pokemon} className="opacity-50" />
            <motion.div
                className="absolute text-theme"
                variants={{
                    hide: { scaleX: 0 },
                    show: { scaleX: 1 },
                }}
                transition={{ delay: 0.1 }}>
                {pokemon}
            </motion.div>
        </motion.div>
    );
}
function GroupReason({ reason, members, difficulty }: GameGroup) {
    const backgroundColours = [
        'bg-easy-500',
        'bg-medium-500',
        'bg-hard-500',
        'bg-extrahard-500',
    ];
    return (
        <div
            className={cn(
                'col-span-4 col-start-1 flex  flex-col items-center justify-center rounded bg-easy-500 text-center',
                backgroundColours[difficulty]
            )}>
            <div className="text-lg">{reason}</div>
            <div className="text-sm uppercase">{members.join(', ')}</div>
        </div>
    );
}
export function GameGrid({ className }: WithClassNameProps) {
    const game = useGameStore();
    const matchingGroups = useGameStore((game) => getMatchingGroups(game));
    console.log(gameToShareMessage(game, 1, true));
    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                className={cn(
                    'mx-auto grid aspect-square max-h-screen w-full max-w-[100%] grid-cols-4 grid-rows-4 gap-2 font-bold lg:aspect-[1.618/1]',
                    className
                )}
                key={game.grid.join()}>
                {matchingGroups.map((g) => (
                    <GroupReason key={g.reason} {...g} />
                ))}
                {game.grid.map((w) => (
                    <GameCell
                        value={w}
                        key={w}
                        onClick={game.select}
                        selected={game.selected.includes(w)}>
                        <PokemonCellContent pokemon={w} />
                    </GameCell>
                ))}
            </motion.div>
        </AnimatePresence>
    );
}
