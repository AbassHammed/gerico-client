/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import { AlertCircle } from 'lucide-react';

import styleHandler from '../theme/style-handler';

interface Props {
  style?: React.CSSProperties;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
}

const sizeMap = {
  tiny: 14,
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 32,
};

export default function InputErrorIcon({ style, size = 'medium' }: Props) {
  const __styles = styleHandler('inputErrorIcon');

  return (
    <div className={__styles.base} style={style}>
      <AlertCircle size={sizeMap[size]} strokeWidth={2} />
    </div>
  );
}
