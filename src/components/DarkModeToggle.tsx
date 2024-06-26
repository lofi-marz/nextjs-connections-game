'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { cn } from '../utils';

export function DarkModeSpacer() {
    return <div className="aspect-[2/1] h-16 w-full"></div>;
}

export function DarkModeToggle({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const { resolvedTheme, setTheme } = useTheme();

    console.log(resolvedTheme);
    if (!mounted) return null;
    //TODO: The animation on hover is a little slow but it does work
    return (
        <motion.button
            layout
            className={clsx(
                'flex aspect-[2/1] flex-col rounded bg-primary transition-all duration-500 hover:bg-theme-invert hover:text-theme',
                resolvedTheme === 'dark' ? 'items-end' : 'items-start',
                className
            )}
            onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }>
            <DarkModeIcon dark={resolvedTheme === 'dark'} />
        </motion.button>
    );
}

function DarkModeIcon({ dark }: { dark: boolean }) {
    return (
        <motion.div
            className={cn(
                'flex aspect-square h-full flex-row items-center justify-center overflow-clip rounded bg-theme-invert p-1 text-sm text-theme'
            )}
            layout>
            <AnimatePresence mode="wait">
                <motion.div
                    key={dark ? 'dark' : 'light'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout>
                    {dark ? <FaMoon /> : <FaSun />}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
