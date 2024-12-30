import React from 'react';

import { NextResponse } from 'next/server';

import { PayslipPDF } from '@/components/interfaces/PayslipPDF';
import { renderToBuffer } from '@react-pdf/renderer';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { totals, payslip, user, company, payslipData, grossSalary } = body;

    const pdfBuffer = await renderToBuffer(
      <PayslipPDF
        totals={totals}
        payslip={payslip}
        user={user}
        company={company}
        payslipData={payslipData}
        grossSalary={grossSalary}
      />,
    );

    return NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${user.last_name.replace(/ /g, '_')}_payslip.pdf`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
