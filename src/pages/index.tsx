import { sans } from '@/styles/fonts';
import { cn } from '@/utils/utils';
import Head from 'next/head';

export default function Home() {
    return (
        <div
            className={cn(
                'flex min-h-screen w-full flex-col items-center justify-center bg-light font-sans text-dark dark:bg-dark dark:text-light',
                sans.variable
            )}>
            <Head>
                <title>Hello World!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            Hello World!
        </div>
    );
}
