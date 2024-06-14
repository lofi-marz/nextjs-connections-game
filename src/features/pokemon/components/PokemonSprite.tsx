import { cn } from '@/utils/utils';
import Image from 'next/image';
import { PokemonClient } from 'pokenode-ts';
import { memo } from 'react';
import { useQuery } from 'react-query';
import { WithClassNameProps } from 'types';

type PokemonSpriteProps = { pokemon: string } & WithClassNameProps;
export const PokemonSprite = memo(function PokemonSprite({
    pokemon,
    className,
}: PokemonSpriteProps) {
    //const src = pokedex.find((p) => p.value === pokemon)?.sprite!;
    const p = new PokemonClient(); //TODO: Context
    const { data } = useQuery({
        queryKey: 'pokemon-' + pokemon,
        queryFn: () => p.getPokemonByName(pokemon),
    });
    const sprite = data?.sprites.front_default;

    return (
        <span className={cn('relative h-full w-full', className)}>
            {sprite && (
                <Image
                    className="object-cover drop-shadow-2xl"
                    src={sprite}
                    alt={`Sprite for ${pokemon}`}
                    fill
                    style={{ imageRendering: 'pixelated' }}
                    quality="100"
                />
            )}
        </span>
    );
});
