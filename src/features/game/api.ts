import { PokemonClient } from 'pokenode-ts';
import { DailyGameDocumentSchema } from './types';

export async function getDailyGame() {
    const API_URL = process.env.API_URL ?? 'http://localhost:3005';
    const p = new PokemonClient();
    const game = await fetch(API_URL + '/api/daily-game').then((res) =>
        res.json()
    ).then((res) => DailyGameDocumentSchema.parse(res));
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
    console.log('Received game:', game);
	return  { dayIndex: game.day, groups: names };
    /*const names = await Promise.all(
            game.groups.map(async (g) => ({
                ...g,
                members: await Promise.all(
                    g.members.map(
                        async (m) => (await p.getPokemonById(Number(m))).name
                    )
                ),
            }))
        );*/
}
