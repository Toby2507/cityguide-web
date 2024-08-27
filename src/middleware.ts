import { EntityType } from '@/types';
import paths from '@/utils/paths';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userType = request.cookies.get('city-guide-type')?.value;
  const isPartner = request.cookies.get('city-guide-partner')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isNextRoute = request.nextUrl.pathname.startsWith('/_next');
  if (userType === EntityType.ESTABLISHMENT && !isAdminRoute && !isNextRoute)
    return NextResponse.redirect(new URL(paths.admin(), request.url));
  if (userType === EntityType.USER && !isPartner && isAdminRoute)
    return NextResponse.redirect(new URL(paths.home(), request.url));
  return NextResponse.next();
}
