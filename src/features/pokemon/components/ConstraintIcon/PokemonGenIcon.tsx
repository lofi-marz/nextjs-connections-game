import { PokemonGen } from '../../types';
import { ConstraintIconWrapper } from './ConstraintIconWrapper';

const genMap = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
export function PokemonGenIcon({ gen }: { gen: PokemonGen }) {
    const hueDeg = ((gen - 1) / 7) * 360;
    return (
        <ConstraintIconWrapper
            title={`Gen ${genMap[gen - 1]}`}
            className=" bg-red-500  text-4xl"
            style={{ filter: `hue-rotate(${hueDeg}deg)` }}>
            {genMap[gen - 1]}
        </ConstraintIconWrapper>
    );
}
