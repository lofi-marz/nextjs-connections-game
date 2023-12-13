import { GameGrid, GameWindow } from '@/features/game/components';
import { sans } from '@/styles/fonts';
import { cn } from '@/utils/utils';
import Head from 'next/head';

export default function Home() {
    return (
        <main
            className={cn(
                'flex min-h-screen w-full flex-col items-center justify-center bg-theme font-sans ',
                sans.variable
            )}>
            <Head>
                <title>Hello World!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-screen w-full flex-col items-center justify-center ">
                <GameWindow/>
            </div>
        </main>
    );
}
