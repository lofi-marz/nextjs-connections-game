import type { AriaToastProps } from '@react-aria/toast';
import { useToast } from '@react-aria/toast';
import { useRef } from 'react';
import { Button } from 'react-aria-components';
import { ToastProps } from './types';
import { FaX } from 'react-icons/fa6';
import { motion } from 'framer-motion';

// Reuse the Button from your component library. See below for details.
const toastVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
};
export function Toast<T extends React.ReactNode>({
    state,
    ...props
}: ToastProps<T>) {
    let ref = useRef(null);
    let { toastProps, titleProps, closeButtonProps } = useToast(
        props,
        state,
        ref
    );
    console.log(closeButtonProps);
    return (
        <motion.div
            {...(toastProps as typeof motion.div)}
            ref={ref}
            className="flex flex-row gap-2 rounded-xl bg-primary p-6 font-sans font-semibold"
            initial="hide"
            animate="show"
            exit="hide"
            variants={toastVariants}>
            <div {...titleProps}>{props.toast.content}</div>
            <Button {...closeButtonProps}>
                <FaX />
            </Button>
        </motion.div>
    );
}
