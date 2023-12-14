import { useState, type PropsWithChildren, AnimationEventHandler } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { WithClassNameProps } from 'types';
import { cn } from 'utils';

import {
    Button,
    Dialog,
    DialogTrigger,
    Heading,
    Input,
    Label,
    Modal,
    ModalOverlay,
    TextField,
} from 'react-aria-components';
export function useDialogControls(startOpen = false) {
    const [open, setOpen] = useState(startOpen);
    return [open, () => setOpen(true), () => setOpen(false)] as const;
}

export type DialogControlProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};
type DialogBoxProps = PropsWithChildren<{
    title?: string;
    hideClose?: boolean;
}> &
    WithClassNameProps &
    DialogControlProps;

const dialogBoxContainerVariants: Variants = {
    hide: { opacity: 1 },
    show: { opacity: 1, transition: { when: 'beforeChildren' } },
};

const dialogBoxVariants: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1, transition: { ease: 'easeOut' } },
};

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);
export function ModalDialog({
    isOpen,
    onOpenChange,
    title,
    children,
    className,
    hideClose = false,
}: DialogBoxProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <MotionModalOverlay
                    isOpen
                    onOpenChange={onOpenChange}
                    className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-start pt-48 text-xl"
                    variants={dialogBoxContainerVariants}
                    initial="hide"
                    animate="show"
                    exit="hide">
                    <MotionModal
                        className={cn(
                            'relative flex w-full max-w-xl flex-col items-center justify-center gap-6  rounded-xl bg-primary-400 font-sans text-base text-light drop-shadow',
                            className
                        )}
                        variants={dialogBoxVariants}>
                        <Dialog className="h-full w-full p-6 px-5">
                            {title && (
                                <Heading className="py-3 text-xl font-bold lg:text-3xl" slot='title'>
                                    {title}
                                </Heading>
                            )}
                            {hideClose || (
                                <button
                                    className="absolute right-0 top-0 p-4 transition-all hover:text-red-800"
                                    onClick={() => onOpenChange(false)}>
                                    <FaTimes />
                                </button>
                            )}
                           
                            <motion.div
                                className={cn('flex w-full flex-col gap-4')}>
                                {children}
                            </motion.div>
                        </Dialog>
                    </MotionModal>
                </MotionModalOverlay>
            )}
        </AnimatePresence>
    );
}
