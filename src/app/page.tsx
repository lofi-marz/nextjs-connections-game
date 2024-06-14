import { GameSection } from '@/features/game/components/GameWindow/GameSection';

	
export default function Index() {
	
	return <GameSection/>
	/*const dayIndex = 0;
	const groups: number[] = [];
    console.log('Pokennections:, ', dayIndex, groups);

    const gameIsHydrated = useGameIsHydrated();
    const gameEndState = useGameStore((state) =>
        gameIsHydrated ? checkGameEndState(state) : null
    );
    const day = useGameStore((state) => state.day);
    const initializeGame = useGameStore((state) => state.initializeGame);
    useEffect(() => {
        //TODO: This probably isnt right
        if (!gameIsHydrated) return;
        if (dayIndex !== day) initializeGame(dayIndex, groups);
    }, [gameIsHydrated, dayIndex, groups]);
    if (!gameIsHydrated) return null;
    return (
        <main
            className={cn(
                'flex min-h-screen w-screen flex-col items-center justify-center bg-theme font-sans ',
                sans.variable
            )}>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta
                    name="google-site-verification"
                    content="BFFC2gymsTAg2Gl1xwlpD2O_FE1LfXV0frxo9op1c9s"
                />
            </Head>
            <div className="flex h-screen w-full flex-col items-center justify-start">
                <Nav />
                <GameWindow />
                <GameEndDialog day={day} gameEndState={gameEndState} />
            </div>
        </main>
    );*/
}


