import { cn } from '@/utils/utils';
import { useGameStore } from '../../stores';
import { Button, ButtonProps } from 'react-aria-components';
function GameControlButton(props: ButtonProps) {
    return (
        <Button
            {...props}
            className={cn(
                'rounded bg-theme-invert p-2 text-theme',
                props.className
            )}
        />
    );
}
export function GameControls() {
    const shuffle = useGameStore((state) => state.shuffle);
    const submitGuess = useGameStore((state) => state.guess);
    const deselectAll = useGameStore((state) => state.deselectAll);
    return (
        <div className="flex flex-row items-center justify-center gap-2">
            <GameControlButton onPress={shuffle}>Shuffle</GameControlButton>

            <GameControlButton onPress={() => submitGuess()}>
                Submit
            </GameControlButton>

            <GameControlButton onPress={() => deselectAll()}>
                Deselect All
            </GameControlButton>
        </div>
    );
}
