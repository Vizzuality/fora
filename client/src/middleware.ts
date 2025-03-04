export { default } from 'next-auth/middleware';

export const config = { matcher: ['/my-details/:path*', '/my-projects/:path*', '/my-fundings'] };
