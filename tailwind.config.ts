/* eslint-disable @typescript-eslint/no-require-imports */
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    variables: {
      DEFAULT: {
        width: {
          listbox: '320px',
        },
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    backgroundColor: ({ theme }: { theme: any }) => ({
      ...theme('colors'),
      DEFAULT: 'hsl(var(--background-default) / <alpha-value>)',
      '200': 'hsl(var(--background-200) / <alpha-value>)',
      alternative: {
        DEFAULT: 'hsl(var(--background-alternative-default) / <alpha-value>)',
        '200': 'hsl(var(--background-alternative-200) / <alpha-value>)',
      },
      selection: 'hsl(var(--background-selection) / <alpha-value>)',
      control: 'hsl(var(--background-control) / <alpha-value>)',
      surface: {
        '75': 'hsl(var(--background-surface-75) / <alpha-value>)',
        '100': 'hsl(var(--background-surface-100) / <alpha-value>)',
        '200': 'hsl(var(--background-surface-200) / <alpha-value>)',
        '300': 'hsl(var(--background-surface-300) / <alpha-value>)',
        '400': 'hsl(var(--background-surface-400) / <alpha-value>)',
      },
      foreground: {
        DEFAULT: 'hsl(var(--foreground-default) / <alpha-value>)',
        light: 'hsl(var(--foreground-light) / <alpha-value>)',
        lighter: 'hsl(var(--foreground-lighter) / <alpha-value>)',
        muted: 'hsl(var(--foreground-muted) / <alpha-value>)',
        contrast: 'hsl(var(--foreground-contrast) / <alpha-value>)',
      },
      overlay: {
        DEFAULT: 'hsl(var(--background-overlay-default) / <alpha-value>)',
        hover: 'hsl(var(--background-overlay-hover) / <alpha-value>)',
      },
      muted: 'hsl(var(--background-muted) / <alpha-value>)',
      button: 'hsl(var(--background-button-default) / <alpha-value>)',
      dialog: 'hsl(var(--background-dialog-default) / <alpha-value>)',
      'dash-sidebar': 'hsl(var(--background-dash-sidebar) / <alpha-value>)',
      'dash-canvas': 'hsl(var(--background-dash-canvas) / <alpha-value>)',
    }),

    borderColor: ({ theme }: { theme: any }) => ({
      ...theme('colors'),
      DEFAULT: 'hsl(var(--border-default) / <alpha-value>)',
      muted: 'hsl(var(--border-muted) / <alpha-value>)',
      secondary: 'hsl(var(--border-secondary) / <alpha-value>)',
      overlay: 'hsl(var(--border-overlay) / <alpha-value>)',
      control: 'hsl(var(--border-control) / <alpha-value>)',
      default: 'hsl(var(--border-default) / <alpha-value>)',
      alternative: 'hsl(var(--border-alternative) / <alpha-value>)',
      strong: 'hsl(var(--border-strong) / <alpha-value>)',
      stronger: 'hsl(var(--border-stronger) / <alpha-value>)',
      button: {
        DEFAULT: 'hsl(var(--border-button-default) / <alpha-value>)',
        hover: 'hsl(var(--border-button-hover) / <alpha-value>)',
      },
    }),

    textColor: ({ theme }: { theme: any }) => ({
      ...theme('colors'),
      foreground: {
        DEFAULT: 'hsl(var(--foreground-default) / <alpha-value>)',
        light: 'hsl(var(--foreground-light) / <alpha-value>)',
        lighter: 'hsl(var(--foreground-lighter) / <alpha-value>)',
        muted: 'hsl(var(--foreground-muted) / <alpha-value>)',
        contrast: 'hsl(var(--foreground-contrast) / <alpha-value>)',
      },
    }),
    extend: {
      colors: {
        border: {
          DEFAULT: 'hsl(var(--border-default) / <alpha-value>)',
          muted: 'hsl(var(--border-muted) / <alpha-value>)',
          secondary: 'hsl(var(--border-secondary) / <alpha-value>)',
          overlay: 'hsl(var(--border-overlay) / <alpha-value>)',
          control: 'hsl(var(--border-control) / <alpha-value>)',
          alternative: 'hsl(var(--border-alternative) / <alpha-value>)',
          strong: 'hsl(var(--border-strong) / <alpha-value>)',
          stronger: 'hsl(var(--border-stronger) / <alpha-value>)',
          button: {
            DEFAULT: 'hsl(var(--border-button-default) / <alpha-value>)',
            hover: 'hsl(var(--border-button-hover) / <alpha-value>)',
          },
        },
        // Brand colors
        brand: {
          DEFAULT: 'var(--brand-default) ',
          button: 'hsl(var(--brand-button) / <alpha-value>)',
          link: 'var(--brand-link)',
          '200': 'var(--brand-200)',
          '300': 'var(--brand-300)',
          '400': 'var(--brand-400)',
          '500': 'var(--brand-500)',
          '600': 'var(--brand-600)',
        },

        // Other color variables
        black: 'hsl(var(--colors-black) / <alpha-value>)',
        white: 'hsl(var(--colors-white) / <alpha-value>)',
        'gray-1100': 'hsl(var(--colors-gray-1100) / <alpha-value>)',
        'gray-dark': {
          '100': 'hsl(var(--colors-gray-dark-100) / <alpha-value>)',
          '200': 'hsl(var(--colors-gray-dark-200) / <alpha-value>)',
          // ...
        },
        'gray-light': {
          '100': 'hsl(var(--colors-gray-light-100) / <alpha-value>)',
          '200': 'hsl(var(--colors-gray-light-200) / <alpha-value>)',
          // ...
        },
        'slate-dark': {
          '100': 'hsl(var(--colors-slate-dark-100) / <alpha-value>)',
          '200': 'hsl(var(--colors-slate-dark-200) / <alpha-value>)',
          // ...
        },
        'slate-light': {
          '100': 'hsl(var(--colors-slate-light-100) / <alpha-value>)',
          '200': 'hsl(var(--colors-slate-light-200) / <alpha-value>)',
          // ...
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive-default) / <alpha-value>)',
          '200': 'hsl(var(--destructive-200) / <alpha-value>)',
          '300': 'hsl(var(--destructive-300) / <alpha-value>)',
          '400': 'hsl(var(--destructive-400) / <alpha-value>)',
          '500': 'hsl(var(--destructive-500) / <alpha-value>)',
          '600': 'hsl(var(--destructive-600) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning-default) / <alpha-value>)',
          '200': 'hsl(var(--warning-200) / <alpha-value>)',
          '300': 'hsl(var(--warning-300) / <alpha-value>)',
          '400': 'hsl(var(--warning-400) / <alpha-value>)',
          '500': 'hsl(var(--warning-500) / <alpha-value>)',
          '600': 'hsl(var(--warning-600) / <alpha-value>)',
        },
        _secondary: {
          DEFAULT: 'hsl(var(--secondary-default) / <alpha-value>)',
          '200': 'hsl(var(--secondary-200) / <alpha-value>)',
          '400': 'hsl(var(--secondary-400) / <alpha-value>)',
        },
        studio: 'hsl(var(--colors-gray-light-200))',
        // 'brand-100': '#b3cde0',
        // 'brand-200': '#6497b1',
        // 'brand-300': '#005b96',
        // 'brand-400': '#03396c',
        // 'brand-500': '#011f4b',
        // border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      width: {
        listbox: 'var(--width-listbox);',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        flip: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'bounce-dot1': 'bounce 1s infinite 0.1s',
        'bounce-dot2': 'bounce 1s infinite 0.2s',
        'bounce-dot3': 'bounce 1s infinite 0.3s',
        flip: 'flip 1.5s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
