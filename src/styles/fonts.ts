import { Rubik, Teko } from 'next/font/google';
export const title = Teko({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-title',
});
export const sans = Rubik({
    subsets: ['latin'],
    weight: 'variable',
    variable: '--font-sans',
});
