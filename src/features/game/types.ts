import { MAX_SELECTED } from 'consts';
import { z } from 'zod';

export type GameDifficulty = number; //TODO: Figure this out
const GameDifficultySchema: z.ZodType<GameDifficulty> = z
    .number()
    .int()
    .gte(0)
    .lte(3);
export const DailyGameDocumentSchema = z.object({
    day: z.number(),
    groups: z.array(
        z.object({
            reason: z.string(),
            members: z.array(z.string()).length(MAX_SELECTED),
            difficulty: GameDifficultySchema,
        })
    ),
});

export type DailyGameDocument = z.infer<typeof DailyGameDocumentSchema>;
type GameGroupWithIds = GameGroup; //Semantic difference for now

export type GameGroup = {
    reason: string;
    members: string[];
    difficulty: GameDifficulty;
};
type GroupMember = string;
export type GameState = {
    day: number;
    groups: GameGroup[];
    selected: GroupMember[];
    guesses: GroupMember[][];
    grid: string[];
};

export type GameEndState = 'win' | 'lose' | null;
export type GameActions = {
    guess: (members?: GroupMember[]) => void;
    select: (word: string) => void;
    shuffle: () => void;
    deselectAll: () => void;
    initializeGame: (day: number, groups: GameGroup[]) => void;
};

export type GameStore = GameState & GameActions;
