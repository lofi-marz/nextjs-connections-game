'use client';
import {
	DailyGameDocument,
	GameDifficulty,
	GameGroup,
} from '@/features/game/types';
import { PokemonSprite } from '@/features/pokemon/components/PokemonSprite';
import { sans } from '@/styles/fonts';
import { cn } from '@/utils';
import axios from 'axios';
import { PokemonClient } from 'pokenode-ts';

import {
	Control,
	SubmitHandler,
	UseFormRegister,
	useForm
} from 'react-hook-form';
import { UseQueryResult, useQueries } from 'react-query';
type GameForm = {
    day: number;
    token: string;
    members: string[];
    groupSettings: { reason: string; difficulty: GameDifficulty }[];
};
type GroupForm = GameGroup;
function PokemonSelect({
    index,
    value,
    register,
}: {
    index: number;
    value: string;
    register: UseFormRegister<GameForm>;
}) {
    return (
        <label className="relative flex bg-theme-invert">
            {value && (
                <PokemonSprite
                    pokemon={value}
                    className="absolute opacity-50"
                />
            )}
            <input
                {...register(`members.${index}`)}
                className="relative z-10 h-full w-full bg-transparent"
            />
        </label>
    );
}

function GroupForm({
    key,
    index,
    register,
    control,
}: {
    key: number;
    index: number;
    register: UseFormRegister<GameForm>;
    control: Control<GameForm, any>;
}) {
    return <input {...register(`members.${key}`)}></input>;
}

function parseForm(
    form: GameForm,
    idQueries: UseQueryResult<number, unknown>[]
): DailyGameDocument {
    return {
        day: Number(form.day),
        groups: form.groupSettings.map((s, i) => ({
            ...s,
            members: form.members
                .map((_, i) => idQueries[i].data?.toString() ?? '')
                .filter((_, j) => Math.floor(j / 4) === i),
            difficulty: Number(s.difficulty),
        })),
    };
}
export default function CreateGame() {
    const { control, register, watch, handleSubmit } = useForm<GameForm>({
        defaultValues: {
            day: 0,
            members: [...new Array(16)].fill('bulbasaur'),
            token: process.env.NEXT_PUBLIC_API_TOKEN ?? '',
            groupSettings: [...new Array(4)].map((_, i) => ({
                reason: '',
                difficulty: i % 4,
            })),
        },
    });
    const onSubmit: SubmitHandler<GameForm> = (data) =>
        axios
            .post(
                '/api/add-game',
                {
                    token: process.env.NEXT_PUBLIC_API_TOKEN,
                    game: parseForm(data, fetchedPokemon),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    const client = new PokemonClient();
    const watchAllFields = watch();
    const watchPokemon = watch('members');
    const fetchedPokemon = useQueries(
        watchPokemon.map((p) => ({
            queryKey: ['pokemon', p],
            queryFn: async () => client.getPokemonByName(p).then((p) => p.id),
        }))
    );

    return (
        <div
            className={cn(
                'flex h-screen w-screen items-center justify-center font-sans text-theme',
                sans.variable
            )}>
            <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}>
                <input type="number" {...register('day')}></input>
                <div className="flex h-96 flex-row">
                    <div className="grid  h-full  grid-cols-4 grid-rows-4">
                        {[...new Array(16)].map((_, index) => (
                            <PokemonSelect
                                key={index}
                                index={index}
                                register={register}
                                value={watchPokemon[index]}
                            />
                        ))}
                    </div>
                    <div className="flex h-full flex-col">
                        {[...new Array(4)].map((_, i) => (
                            <div
                                className="flex grow flex-col"
                                key={`row-${i}`}>
                                <input
                                    type="range"
                                    min="0"
                                    max="3"
                                    {...register(
                                        `groupSettings.${i}.difficulty`
                                    )}
                                />
                                <input
                                    type="textarea"
                                    className="grow"
                                    {...register(`groupSettings.${i}.reason`)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="whitespace-pre-wrap break-all bg-theme-invert">
                    {JSON.stringify(parseForm(watchAllFields, fetchedPokemon))}
                </div>
                <button
                    disabled={fetchedPokemon.some((q) => !q.isSuccess)}
                    type="submit"
                    className="mx-auto w-fit bg-theme-invert p-4 text-theme transition-all disabled:brightness-50">
                    Submit
                </button>
            </form>
        </div>
    );
}
