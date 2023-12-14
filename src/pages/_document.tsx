import clsx from 'clsx';
import { sans, title } from '@/styles/fonts';
import { Html, Head, Main, NextScript } from 'next/document';
import { cn } from '../utils';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={cn(sans.variable, title.variable)}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
