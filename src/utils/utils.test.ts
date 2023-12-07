import { cn } from './utils';

describe('Utils', () => {
    it('cn merges classes correctly', () => {
        const className = 'flex';
        expect(cn(className, className)).toEqual(className);
    });
});
