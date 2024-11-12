import { createContext } from 'react';

export const SelectContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (e: any) => {},
  selected: undefined,
});
