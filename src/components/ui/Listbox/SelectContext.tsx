/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createContext } from 'react';

export const SelectContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (e: any) => {},
  selected: undefined,
});
