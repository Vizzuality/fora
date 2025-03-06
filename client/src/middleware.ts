import { NextResponse } from 'next/server';

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

const PRIVATE_PAGES = /^(\/auth(?!\/signin|\/signup|\/forgot-password))/;

export const isPrivatePath = (pathname: string) => {
  return PRIVATE_PAGES.test(pathname);
};

export default function middleware(req: NextRequestWithAuth) {
  if (isPrivatePath(req.nextUrl.pathname)) {
    return withAuth(req, {
      pages: {
        signIn: '/auth/signin',
      },
    });
  }

  return NextResponse.next();
}
