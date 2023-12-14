export type DailyGameDocument = {
    day: number;
    start: string;
    end: string;
};
export type GameDifficulty = 0 | 1 | 2 | 3;
export type GameGroup = {
    reason: string;
    members: string[];
    difficulty: GameDifficulty;
};
type GroupMember = string;
export type GameState = {
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
};

export type GameStore = GameState & GameActions;
