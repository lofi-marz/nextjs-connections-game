import clsx from 'clsx';
import { FaDog, FaDragon } from 'react-icons/fa6';
import { ConstraintIconWrapper } from './ConstraintIconWrapper';

export function PokemonLegendaryIcon({
    isLegendary,
}: {
    isLegendary: boolean;
}) {
    return (
        <ConstraintIconWrapper
            className={clsx(
                'text-4xl',
                isLegendary ? 'bg-amber-500' : 'bg-green-500'
            )}
            title={`${isLegendary ? 'Legendary' : 'Non-Legendary'}`}>
            {isLegendary ? <FaDragon /> : <FaDog />}
        </ConstraintIconWrapper>
    );
}
