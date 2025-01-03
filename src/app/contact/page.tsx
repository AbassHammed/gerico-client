/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import { Metadata } from 'next';

import Contact from '@/components/interfaces/Contact';

export const metadata: Metadata = {
  title: 'Contact',
};

const page = () => <Contact />;

export default page;
