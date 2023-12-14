import { cn } from '@/utils/utils';
import { useGameStore } from '../../stores';
import { Button, ButtonProps } from 'react-aria-components';
import { MAX_SELECTED } from 'consts';
function GameControlButton(props: ButtonProps) {
    return (
        <Button
            {...props}
            className={cn(
                'rounded bg-theme-invert p-2 text-center text-sm font-bold text-theme transition-all hover:scale-105 pressed:scale-95 disabled:bg-theme-invert disabled:brightness-75 sm:text-lg md:p-4 md:text-xl',
                props.className
            )}
        />
    );
}
export function GameControls() {
    const shuffle = useGameStore((state) => state.shuffle);
    const submitGuess = useGameStore((state) => state.guess);
    const deselectAll = useGameStore((state) => state.deselectAll);
    const selectedCount = useGameStore((state) => state.selected.length);
    return (
        <div className="flex flex-row items-center justify-center gap-2 ">
            <GameControlButton onPress={shuffle}>Shuffle</GameControlButton>
            <GameControlButton
                onPress={() => deselectAll()}
                isDisabled={selectedCount === 0}>
                Deselect All
            </GameControlButton>
            <GameControlButton
                onPress={() => submitGuess()}
                isDisabled={selectedCount < MAX_SELECTED}
                className="bg-primary-400 text-grey-50 disabled:text-theme">
                Submit
            </GameControlButton>
        </div>
    );
}
