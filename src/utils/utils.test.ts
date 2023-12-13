import { cn, shuffleArray } from './utils';
import { describe, it, expect } from 'vitest';
describe('Utils', () => {
    it('cn merges classes correctly', () => {
        const className = 'flex';
        expect(cn(className, className)).toEqual(className);
    });

    it('shuffleArray does not modify original array', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(originalArray);
        console.log(originalArray, shuffled);
        expect(originalArray).toEqual([1, 2, 3, 4, 5]);
        expect(originalArray).not.toEqual(shuffled);
    });

    it('shuffleArray produces identical array', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(originalArray);
        expect(
            originalArray.every(
                (v) => shuffled.filter((sv) => v === sv).length === 1
            )
        );
    });
});
