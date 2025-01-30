import { NextApiRequest, NextApiResponse } from 'next';
import { GetServerSidePropsContext } from 'next';
import NextAuth, { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import authenticationService from 'services/authentication';

const MAX_AGE = 2 * 60 * 60; // 2 hours

declare module 'next-auth' {
  interface User {
    token: string;
  }
}

export const authOptions: NextAuthOptions = {
  /**
   * Defining custom pages
   * By default Next-Auth provides /api/auth/signin
   */
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/signin`,
    signOut: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  },

  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<'email' | 'password', string> | undefined) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const { data } = await authenticationService.signIn(email, password);

        return data;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        const { token: apiToken } = user;
        newToken.accessToken = apiToken;
      }

      return newToken;
    },

    async session({ session, token }) {
      const newSession = session;
      newSession.accessToken = token.accessToken;
      return newSession;
    },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export default NextAuth(authOptions);
