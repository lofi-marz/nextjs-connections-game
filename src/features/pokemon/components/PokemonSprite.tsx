import { cn } from '@/utils/utils';
import Image from 'next/image';
import { PokemonClient } from 'pokenode-ts';
import { useQuery } from 'react-query';
import { WithClassNameProps } from 'types';
export function PokemonSprite({
    pokemon,
    className,
}: { pokemon: string } & WithClassNameProps) {
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
}
