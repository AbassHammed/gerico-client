/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { NextRequest, NextResponse } from 'next/server';

import { API_URL, PagesRoutes } from './lib/constants';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('auth_token')?.value;

  const originalUrl = request.url;

  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL(
        `${PagesRoutes.Auth_SignIn}?redirectTo=${encodeURIComponent(originalUrl)}`,
        request.url,
      ),
    );
  }

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionCookie}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    const userData = await response.json();

    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!userData.data?.is_admin) {
        return NextResponse.redirect(new URL(PagesRoutes.Employee_Home, request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(
      new URL(
        `${PagesRoutes.Auth_SignIn}?redirectTo=${encodeURIComponent(originalUrl)}`,
        request.url,
      ),
    );
  }
}

export const config = {
  matcher: ['/admin/:path*', '/employe/:path*'],
};
