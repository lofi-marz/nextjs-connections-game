import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '../utils';

export function Logo(
    props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={cn(
                'grid aspect-square h-8 grid-cols-3 grid-rows-3 gap-0.5 overflow-clip rounded border-2 border-theme-invert bg-theme-invert lg:h-12',
                props.className
            )}>
            <div className="col-span-2 row-span-1 bg-red-500" />
            <div className="col-span-1 row-span-1 bg-red-500" />
            <div className="col-span-1 row-span-1 bg-grey-800" />
            <div className="col-span-1 row-span-1 bg-grey-300" />
            <div className="col-span-1 row-span-1 bg-grey-800" />
            <div className="col-span-1 row-span-1 bg-red-500" />
            <div className="col-span-2 row-span-1 bg-red-500" />
        </div>
    );
}
