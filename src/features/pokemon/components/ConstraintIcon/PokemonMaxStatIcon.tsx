import { PokemonStatName } from '../../types';
import { cn } from 'lib/utils';
import { capitalize } from '@/utils/text';
import { ConstraintIconWrapper } from './ConstraintIconWrapper';

const names: Record<PokemonStatName, string> = {
    attack: 'atk',
    defense: 'def',
    'special-attack': 'sp. atk',
    'special-defense': 'sp. def',
    speed: 'spd',
    hp: 'hp',
} satisfies Record<PokemonStatName, string>;

const colours: Record<PokemonStatName, string> = {
    defense: 'bg-red-500',
    attack: 'bg-red-500',
    'special-attack': 'bg-red-500',
    'special-defense': 'bg-red-500',
    speed: 'bg-red-500',
    hp: 'bg-red-500',
} satisfies Record<PokemonStatName, string>;

export function PokemonMaxStatIcon({ stat }: { stat: PokemonStatName }) {
    return (
        <ConstraintIconWrapper
            className={cn('text-2xl capitalize', colours[stat])}
            title={`${capitalize(stat.replace('-', ' '))} Icon`}>
            {names[stat]}
        </ConstraintIconWrapper>
    );
}
