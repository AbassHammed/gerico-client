import { useContext } from 'react';

import defaultTheme from './default-theme';
import { ThemeContext } from './provider';

export default function styleHandler(target: string) {
  let {
    theme: { [target]: __styles },
  }: any = useContext(ThemeContext);

  if (!__styles) {
    __styles = defaultTheme.accordion;
  }

  __styles = JSON.stringify(__styles).replace(/\\n/g, '').replace(/\s\s+/g, ' ');

  __styles = JSON.parse(__styles);

  return __styles;
}
