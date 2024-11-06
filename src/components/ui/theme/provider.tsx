'use client';

import { createContext } from 'react';

import defaultTheme from './default-theme';

interface ThemeContextInterface {
  theme?: any;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: defaultTheme,
});
