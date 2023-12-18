import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <NextSeo
                    title="Pokennections"
                    description="The Pokemon-themed guessing game."
                />
                <Component {...pageProps} />
                <Analytics />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
