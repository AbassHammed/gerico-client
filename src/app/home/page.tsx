'use client';

import Link from 'next/link';

import { CalendarPlus, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 h-full">
      <Link
        href="/home/leave"
        className="w-64 h-40 bg-brand-400 hover:bg-brand-500 rounded-lg shadow-md flex flex-col items-center justify-center text-2xl text-white font-bold cursor-pointer relative">
        <CalendarPlus className="mb-2 h-10 w-10 text-3xl text-white" />
        Prise de congés
      </Link>
      <Link
        href="/home/payslip"
        className="w-64 h-40 bg-brand-400 hover:bg-brand-500 rounded-lg shadow-md flex flex-col items-center justify-center text-2xl text-white font-bold cursor-pointer relative">
        <FileText className="mb-2 h-10 w-10 text-3xl text-white" />
        Fiche de paie
      </Link>
    </div>
  );
}
