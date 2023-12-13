import { cn } from 'lib/utils';
import { WithClassNameProps } from 'types';

export function Pokeball({ className }: WithClassNameProps) {
    return <div className={cn('aspect-square h-full w-full', className)}></div>;
}
