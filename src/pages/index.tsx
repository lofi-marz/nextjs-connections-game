import { GameGrid, GameWindow } from '@/features/game/components';
import { sans } from '@/styles/fonts';
import { cn } from '@/utils/utils';
import Head from 'next/head';
import { Nav } from '../components';
import { GameEndDialog } from '@/features/game/components/GameEndDialog';
import { useGameStore } from '@/features/game/stores';
import { checkGameEndState } from '@/features/game/utils';

export default function Home() {
    const gameEndState = useGameStore((state) => checkGameEndState(state))
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
            <div className="flex min-h-screen w-full flex-col items-center justify-center ">
                <Nav />
                <GameWindow />
                <GameEndDialog day={1} gameEndState={gameEndState} />
            </div>
        </main>
    );
}
