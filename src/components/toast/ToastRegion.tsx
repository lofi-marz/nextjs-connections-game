import { useToastRegion } from '@react-aria/toast';
import { useRef } from 'react';
import { Toast } from './Toast';

import { ToastRegionProps } from './types';
import { AnimatePresence } from 'framer-motion';

export function ToastRegion<T extends React.ReactNode>({
    state,
    ...props
}: ToastRegionProps<T>) {
    let ref = useRef(null);
    let { regionProps } = useToastRegion(props, state, ref);

    return (
        <div
            {...regionProps}
            ref={ref}
            className="fixed bottom-0 z-50 mx-auto flex flex-col gap-4 p-4">
            <AnimatePresence>
                {state.visibleToasts.map((toast) => (
                    <Toast key={toast.key} toast={toast} state={state} />
                ))}
            </AnimatePresence>
        </div>
    );
}
