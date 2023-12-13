import { cn } from 'lib/utils';
import { CSSProperties, PropsWithChildren } from 'react';

type ConstraintIconWrapperProps = PropsWithChildren<{
    title: string;
    style?: CSSProperties;
    className?: string;
}>;
export function ConstraintIconWrapper({
    title,
    className,
    style,
    children,
}: ConstraintIconWrapperProps) {
    return (
        <div
            title={`${title} Icon`}
            className={cn(
                'relative flex aspect-square h-4/5 items-center justify-center rounded-full font-bold md:h-3/5',
                className
            )}
            style={style}>
            {children}
        </div>
    );
}
