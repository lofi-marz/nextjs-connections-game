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
    console.log(dayIndex, groups)
    const gameIsHydrated = useGameIsHydrated();
    const gameEndState = useGameStore((state) => checkGameEndState(state));
    const day = useGameStore((state) => state.day);
    const initializeGame = useGameStore((state) => state.initializeGame);
    useEffect(() => {
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

export const getServerSideProps: GetServerSideProps<{
    groups: GameGroup[];
    dayIndex: number;
}> = async () => {
    console.log('Hello World');
    const API_URL = process.env.API_URL ?? 'http://localhost:3000';
    const p = new PokemonClient();
    try {
        const game = await axios
            .get<{
                day: number;
                game: DailyGameDocument;
            }>(API_URL + '/api/daily-game')
            .then((res) => DailyGameDocumentSchema.parse(res.data));

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
        return { props: { dayIndex: 0, groups: createTestGame().groups } };
    }
};
