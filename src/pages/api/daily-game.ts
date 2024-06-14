import { getClient } from '@/utils/mongodb';
import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { DailyGameDocument } from '@/features/game/types';
import { getGameRound } from '@/utils/utils';
import { PokemonClient } from 'pokenode-ts';
async function loadTxts() {
    const fullPath = path.resolve(process.cwd(), 'games');
    const dir = await fs.readdir(fullPath);
    console.log(dir);
    const games = await Promise.all(
        dir.map(async (file) => {
            const roundFile = await fs.readFile(
                path.join(fullPath, file),
                'utf8'
            );
            return roundFile.split('\n');
        })
    );

    return games;
    /*const maxGame = Number(dir[dir.length - 1].replace('.txt', ''));
    const roundIndex = 4; //(getGameRound() % maxGame) + 1;

    const roundFile = await fs.readFile(
        path.join(fullPath, dir[roundIndex]),
        'utf8'
    );*/
}

async function pokemonToId(pokemon: string) {
    const c = new PokemonClient();
    return c.getPokemonSpeciesByName(pokemon).then((p) => p.id);
}
let testGame = {
    day: 0,
    groups: [
        {
            members: ['bulbasaur', 'bellsprout', 'roserade', 'oddish'],
            reason: 'Grass-Poison Pokemon',
            difficulty: 0,
        },
        {
            members: ['venusaur', 'oinkologne', 'weavile', 'croagunk'],
            reason: 'Gender Differences',
            difficulty: 1,
        },
        {
            members: ['togepi', 'pichu', 'snom', 'golbat'],
            reason: 'Evolve when they are leveled up with enough friendship',
            difficulty: 2,
        },
        {
            members: ['weedle', 'kakuna', 'beedrill', 'pidgey'],
            reason: 'Gen I Pokemon',
            difficulty: 3,
        },
    ],
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const client = await getClient();
        /*let testGame = createTestGame();
        await Promise.all(
            testGame.groups.map(async (g) => {
                const ids = await Promise.all(
                    g.members.map((m) =>
                        pokemonToId(m).then((id) => id.toString())
                    )
                );
                g.members = ids;
            })
            collection.insertOne({ day: max, groups: testGame.groups });
        );*/

        const collection = client
            .db('connections-pokemon')
            .collection<DailyGameDocument>('games');

        const max = await collection.countDocuments();

        const roundIndex = getGameRound() % max; //In case we ever forget a round
        console.log(roundIndex);
        const game = await collection.findOne({ day: roundIndex });

        if (!game) {
            res.status(404);
            return res.json('Game not found');
        }

        console.log(`Pokennections ${roundIndex + 1}/${max}`);
        return res.status(200).json(game);
    } catch (e: any) {
        console.log(e);
        return res.status(500).json({
            error: e.toString(),
        });
    }
}
