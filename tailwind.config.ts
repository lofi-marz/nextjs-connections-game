import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';
import reactAria from 'tailwindcss-react-aria-components';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
const t: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
                title: ['var(--font-title)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                grey: colors.stone,
                light: colors.stone[50],
                dark: colors.stone[950],
                easy: colors.green,
                medium: colors.amber,
                hard: colors.orange,
                extrahard: colors.red,
                theme: 'var(--theme)',
                'theme-invert': 'var(--theme-invert)',
                border: 'var(--border)',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: colors.emerald[400],
                    foreground: colors.emerald[50],
                },
                secondary: {
                    DEFAULT: colors.red[400],
                    foreground: colors.red[400],
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [
        forms,
        typography,
        reactAria,
        animate,
        plugin(function ({ addUtilities, theme }) {
            addUtilities({
                '.light': {
                    '--theme': theme('colors.light'),
                    '--theme-invert': theme('colors.dark'),
                },
                '.dark': {
                    '--theme': theme('colors.dark'),
                    '--theme-invert': theme('colors.light'),
                },
            });
        }),
    ],
} satisfies Config;

export default t;

export const themeColors = t.theme?.extend?.colors!;
