import { ConstraintIconWrapper } from './ConstraintIconWrapper';

export function PokemonMonotypeIcon({ isMonotype }: { isMonotype: boolean }) {
    return (
        <ConstraintIconWrapper
            className="bg-theme-invert text-2xl"
            title={`${isMonotype ? 'Monotype' : 'Dual Type'}`}>
            {isMonotype ? 'Mono' : 'Dual'}
        </ConstraintIconWrapper>
    );
}
