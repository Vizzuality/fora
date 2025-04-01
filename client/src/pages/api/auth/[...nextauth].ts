import { NextApiRequest, NextApiResponse } from 'next';
import { GetServerSidePropsContext } from 'next';
import NextAuth, { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import API from '@/services/api';
import authenticationService from '@/services/authentication';
import { Funder } from '@/types/api/funder';

const MAX_AGE = 2 * 60 * 60; // 2 hours

declare module 'next-auth' {
  interface User extends Funder {
    accessToken: string;
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

        const user = await API.request<{ data: Funder }>({
          method: 'GET',
          url: '/members/funder',
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }).then((response) => response.data);

        return {
          ...user.data,
          // token: data.token,
          accessToken: data.token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        const { accessToken: apiToken } = user;
        newToken.accessToken = apiToken;
        newToken.user = user;
      }

      return newToken;
    },

    async session({ session, token }) {
      const newSession = session;
      newSession.accessToken = token.accessToken;
      newSession.user = token.user;
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
