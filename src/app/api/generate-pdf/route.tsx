/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NextResponse } from 'next/server';

import { computeSHA256, getSignedURL } from '@/app/actions';
import { PayslipPDF } from '@/components/interfaces/PayslipPDF';
import { renderToBuffer } from '@react-pdf/renderer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const pdfBuffer = await renderToBuffer(<PayslipPDF {...data} />);
    const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

    const signedURLResult = await getSignedURL({
      fileSize: blob.size,
      fileType: 'application/pdf',
      checksum: await computeSHA256(blob),
      dir: 'payslips',
    });

    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure);
    }
    const { signedUrl, fileUrl } = signedURLResult.success;
    await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/pdf',
      },
      body: blob,
    });

    return NextResponse.json({ fileUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
