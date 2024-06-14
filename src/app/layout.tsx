import { GlobalToastRegion } from '@/components/toast';
import { getDailyGame } from '@/features/game/api';
import { GameStoreProvider } from '@/features/game/provider';
import { createEmptyGame } from '@/features/game/utils';
import { sans } from '@/styles/fonts';
import { cn, shuffleArray } from '@/utils/utils';
import { Analytics } from '@vercel/analytics/react';
import { Nav } from '../components';
import '../styles/globals.css';
import { Providers } from './providers';
export default async function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
	const emptyGame = createEmptyGame();
	const game = await getDailyGame();
	
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    sans.variable,
                    'flex h-[100dvh] flex-col items-center justify-start bg-theme font-sans text-theme-invert'
                )}>
                <GameStoreProvider value={{...emptyGame, groups: game.groups, day: game.dayIndex, grid: shuffleArray(
                        game.groups.flatMap((group) => group.members)
                    )}}>
                    <Providers>
                        <Nav />
                        {children}
                        <GlobalToastRegion />
                    </Providers>
                </GameStoreProvider>
				<Analytics />
            </body>
        </html>
    );
}
