/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use client';

import Link from 'next/link';

import { PagesRoutes } from '@/lib/constants';
import { CalendarPlus, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 h-full">
      <Link
        href={PagesRoutes.Employee_LeaveRequest}
        className="w-64 h-40 bg-brand-400 hover:bg-brand-500 rounded-lg shadow-md flex flex-col items-center justify-center text-2xl text-white font-bold cursor-pointer relative">
        <CalendarPlus className="mb-2 h-10 w-10 text-3xl text-white" />
        Prise de congés
      </Link>
      <Link
        href={PagesRoutes.Employee_Payslips}
        className="w-64 h-40 bg-brand-400 hover:bg-brand-500 rounded-lg shadow-md flex flex-col items-center justify-center text-2xl text-white font-bold cursor-pointer relative">
        <FileText className="mb-2 h-10 w-10 text-3xl text-white" />
        Fiche de paie
      </Link>
    </div>
  );
}
