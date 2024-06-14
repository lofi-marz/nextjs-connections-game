'use client';

import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WithChildrenProps } from 'types';
const queryClient = new QueryClient()
export function Providers({ children }: WithChildrenProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
			<QueryClientProvider client={queryClient}> {children}</QueryClientProvider>
           
        </ThemeProvider>
    );
}
