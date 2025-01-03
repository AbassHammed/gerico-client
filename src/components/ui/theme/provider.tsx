/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import { createContext } from 'react';

import defaultTheme from './default-theme';

interface ThemeContextInterface {
  theme?: any;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: defaultTheme,
});
