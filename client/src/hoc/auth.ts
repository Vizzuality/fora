import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { auth } from 'pages/api/auth/[...nextauth]';

export function withAuth(gssp?: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const session = await auth(context.req, context.res);
    const isPublicRoute = context.req.url?.includes('/auth/');

    if (!session && !isPublicRoute) {
      // Protected route without session -> redirect to signin
      return {
        redirect: {
          destination: '/auth/signin',
          permanent: false,
        },
      };
    }

    if (session && isPublicRoute) {
      // Public route (auth pages) with session -> redirect to projects
      return {
        redirect: {
          destination: '/projects',
          permanent: false,
        },
      };
    }

    if (gssp) {
      const gsspData = await gssp(context);

      return gsspData;
    }

    return {
      props: {},
    };
  };
}
