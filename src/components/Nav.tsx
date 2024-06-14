'use client';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { DarkModeToggle } from './DarkModeToggle';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { DialogContent, DialogOverlay, DialogTrigger } from './ui/dialog';
export function Nav() {
    const desktop = useMediaQuery('md');
    return (
        <nav className="top-0 flex w-full flex-row justify-between p-2 text-2xl md:p-8">
            <div className="flex flex-row items-center justify-center gap-[1ch] rounded pr-2 font-title text-base font-bold transition-all hover:-translate-y-1 sm:text-3xl">
                <Logo />
                pokennections
            </div>
            <div className="flex flex-row items-center justify-center gap-4 text-xl">
                <DialogTrigger>
                    <Button>
                        {desktop ? 'how to play' : '?'}
                    </Button>
                    <DarkModeToggle className="h-6" />
                    <DialogOverlay>
                        <DialogContent>
                            <div className="prose-a:text-primary-foreground prose-invert prose-a:underline  text-center">
                                Pick 4 Pokemon that share something in common.
								<br/>
                                Pick 4 Pokemon, click Submit to confirm your
                                selection, and find the groups without making
                                more than 4 mistakes!
                                <br />
                                Each group has a different difficulty:
                                <br />
                                <br />
                                <ol className="mx-auto flex w-fit flex-col gap-1">
                                    <li className="rounded bg-easy-500 p-0.5 px-3 font-bold">
                                        Easy
                                    </li>
                                    <li className="rounded bg-medium-500 p-0.5 px-3 font-bold">
                                        Medium
                                    </li>
                                    <li className="rounded bg-hard-500 p-0.5 px-3 font-bold">
                                        Hard
                                    </li>
                                    <li className="rounded bg-extrahard-500 p-0.5 px-3 font-bold">
                                        Extra hard
                                    </li>
                                </ol>
                                <br />
                                And each grid (hopefully) has one solution, but
                                Pokemon may belong to multiple categories.{' '}
                                <br />
                                Based on{' '}
                                <a
                                    href="https://www.nytimes.com/games/connections"
                                    target="_blank">
                                    Connections
                                </a>
                                <br /> <br />
                                If you liked this game, say{' '}
                                <a href="https://twitter.com/lofi_marz">
                                    hi
                                </a>{' '}
                                :)
                                <br />
                                (this game is in beta, so feel free to dm me
                                with any feature requests or bugs)
                            </div>
                        </DialogContent>
                    </DialogOverlay>
                </DialogTrigger>
            </div>
        </nav>
    );
}
