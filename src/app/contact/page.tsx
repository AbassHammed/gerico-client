import React from 'react';

import { Metadata } from 'next';

import Contact from '@/components/interfaces/Contact';

export const metadata: Metadata = {
  title: 'Contact',
};

const page = () => <Contact />;

export default page;
