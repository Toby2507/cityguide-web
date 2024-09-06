import { EntityType } from '@/types';
import paths from '@/utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userType = request.cookies.get('type')?.value || '';
  const isPartner = request.cookies.get('partner')?.value === 'true';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  if (userType === EntityType.ESTABLISHMENT && !isAdminRoute)
    return NextResponse.redirect(new URL(paths.admin(), request.url));
  if (userType === EntityType.USER && !isPartner && isAdminRoute)
    return NextResponse.redirect(new URL(paths.home(), request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
