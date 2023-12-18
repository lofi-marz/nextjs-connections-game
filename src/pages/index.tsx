import { GameWindow } from '@/features/game/components';
import { sans } from '@/styles/fonts';
import { cn, getGameRound } from '@/utils/utils';
import Head from 'next/head';
import { Nav } from '../components';
import { GameEndDialog } from '@/features/game/components/GameEndDialog';
import { useGameIsHydrated, useGameStore } from '@/features/game/stores';
import { checkGameEndState, createTestGame } from '@/features/game/utils';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import * as fs from 'node:fs/promises';
import * as path from 'path';
import { DailyGameDocument, GameGroup, GameState } from '@/features/game/types';
import axios from 'axios';
import { z } from 'zod';
import { DailyGameDocumentSchema } from '../features/game/types';
import { useEffect } from 'react';
import { PokemonClient } from 'pokenode-ts';
export default function Home({
    dayIndex,
    groups,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log('Pokennections:, ', dayIndex, groups);
    const gameIsHydrated = useGameIsHydrated();
    const gameEndState = useGameStore((state) => checkGameEndState(state));
    const day = useGameStore((state) => state.day);
    const initializeGame = useGameStore((state) => state.initializeGame);
    useEffect(() => {
        //TODO: This probably isnt right
        if (!gameIsHydrated) return;
        if (dayIndex !== day) initializeGame(dayIndex, groups);
    }, [gameIsHydrated, dayIndex, groups]);
    if (!gameIsHydrated) return null;
    return (
        <main
            className={cn(
                'flex min-h-screen w-full flex-col items-center justify-center bg-theme font-sans ',
                sans.variable
            )}>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div className="flex min-h-screen w-full flex-col items-center justify-center ">
                <Nav />
                <GameWindow />
                <GameEndDialog day={day} gameEndState={gameEndState} />
            </div>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps<{
    groups: GameGroup[];
    dayIndex: number;
}> = async () => {
    const API_URL = process.env.API_URL ?? 'http://localhost:3005';
    const p = new PokemonClient();
    try {
        const game = await axios
            .get<DailyGameDocument>(API_URL + '/api/daily-game')
            .then((res) => {
                console.log(res.data);
                return DailyGameDocumentSchema.parse(res.data);
            });
        console.log('Received game:', game);
        const names = await Promise.all(
            game.groups.map(async (g) => ({
                ...g,
                members: await Promise.all(
                    g.members.map(
                        async (m) => (await p.getPokemonById(Number(m))).name
                    )
                ),
            }))
        );
        return { props: { dayIndex: game.day, groups: names } };
    } catch (e) {
        console.log('Error:', e);
        console.log('Returning test game');
        const testGame = createTestGame();
        console.log(testGame);
        return { props: { dayIndex: -1, groups: createTestGame().groups } };
    }
};
