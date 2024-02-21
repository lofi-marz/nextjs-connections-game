import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
import { GlobalToastRegion } from '@/components/toast';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <NextSeo
                    title="Pokennections"
                    description="The Pokemon-themed guessing game."
                />
                <Component {...pageProps} />
                {mounted && <GlobalToastRegion />}
                <Analytics />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
