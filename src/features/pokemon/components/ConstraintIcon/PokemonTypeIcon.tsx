import { PokemonType } from '../../types';
import Image from 'next/image';
import normal from '../../assets/types/normal.png';
import fire from '../../assets/types/fire.png';
import water from '../../assets/types/water.png';
import electric from '../../assets/types/electric.png';
import grass from '../../assets/types/grass.png';
import ice from '../../assets/types/ice.png';
import fighting from '../../assets/types/fighting.png';
import poison from '../../assets/types/poison.png';
import ground from '../../assets/types/ground.png';
import flying from '../../assets/types/flying.png';
import psychic from '../../assets/types/psychic.png';
import bug from '../../assets/types/bug.png';
import rock from '../../assets/types/rock.png';
import ghost from '../../assets/types/ghost.png';
import dark from '../../assets/types/dark.png';
import steel from '../../assets/types/steel.png';
import fairy from '../../assets/types/fairy.png';
import dragon from '../../assets/types/dragon.png';
import { capitalize } from '@/utils/text';
import { ConstraintIconWrapper } from './ConstraintIconWrapper';

const typeIcons = {
    normal,
    fire,
    water,
    electric,
    grass,
    ice,
    fighting,
    poison,
    ground,
    flying,
    psychic,
    bug,
    rock,
    ghost,
    dark,
    steel,
    fairy,
    dragon,
};

export function PokemonTypeIcon({ type }: { type: Lowercase<PokemonType> }) {
    const src = typeIcons[type.toLocaleLowerCase() as keyof typeof typeIcons];
    return (
        <ConstraintIconWrapper title={`${capitalize(type)} Type`}>
            <Image src={src} fill alt={`Icon for ${type}`} />
        </ConstraintIconWrapper>
    );
}
