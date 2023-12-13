import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getGameRound(): number {
    const today = new Date();
    const july17 = new Date(2023, 6, 17); // 2023-07-17

    const timeDifference = today.getTime() - july17.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

export function shuffleArray<T>(array: T[]) {
    const newArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
