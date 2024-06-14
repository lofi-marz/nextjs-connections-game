'use client';
import { ToastQueue, useToastQueue } from '@react-stately/toast';
import { createPortal } from 'react-dom';
import { ToastRegion } from './ToastRegion';
import { ToastRegionProps } from './types';

// Create a global toast queue.
export const toastQueue = new ToastQueue<string>({
    maxVisibleToasts: 5,
});

export function GlobalToastRegion<T extends React.ReactNode>({
    ...props
}: Omit<ToastRegionProps<T>, 'state'>) {
    // Subscribe to it.
    let state = useToastQueue(toastQueue);
    console.log(state);

    // Render toast region.
    return state.visibleToasts.length > 0
        ? createPortal(<ToastRegion {...props} state={state} />, document.body)
        : null;
}
