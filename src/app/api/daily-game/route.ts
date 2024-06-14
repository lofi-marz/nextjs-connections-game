import { DailyGameDocument } from '@/features/game/types';
import { getClient } from '@/utils/mongodb';
import { getGameRound } from '@/utils/utils';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const client = await getClient();
        const collection = client
            .db('connections-pokemon')
            .collection<DailyGameDocument>('games');

        const max = await collection.countDocuments();

        const roundIndex = getGameRound() % max; //In case we ever forget a round
        console.log(roundIndex);
        const game = await collection.findOne({ day: roundIndex });

        if (!game) {
            return new Response('Corresponding daily game not found', {
                status: 404,
            });
        }

        console.log(`Pokennections ${roundIndex + 1}/${max}`);
        return Response.json(game);
    } catch (e: any) {
        console.log(e);
        return new Response(e.toString(), { status: 500 });
    }
}
