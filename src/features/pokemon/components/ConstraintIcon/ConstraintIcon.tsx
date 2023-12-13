import { PokemonConstraint } from '../../types';
import { PokemonTypeIcon } from './PokemonTypeIcon';
import { PokemonGenIcon } from './PokemonGenIcon';
import { PokemonMonotypeIcon } from './PokemonMonotypeIcon';
import { PokemonLegendaryIcon } from './PokemonLegendaryIcon';
import { PokemonMaxStatIcon } from './PokemonMaxStatIcon';
type ConstraintIconProps = {
    constraint: PokemonConstraint;
};

export function ConstraintIcon({
    constraint,
}: ConstraintIconProps): JSX.Element {
    const { type, value } = constraint;
    switch (type) {
        case 'type':
            return <PokemonTypeIcon type={value} />;
        case 'gen':
            return <PokemonGenIcon gen={value} />;
        case 'monotype':
            return <PokemonMonotypeIcon isMonotype={value} />;
        case 'legendary':
            return <PokemonLegendaryIcon isLegendary={value} />;
        case 'max-stat':
            return <PokemonMaxStatIcon stat={value} />;
    }
}
