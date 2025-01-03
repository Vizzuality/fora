import axios from 'axios';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import AUTHENTICATION from 'services/authentication';

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
    signIn: '/auth/signin',
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

        try {
          const { data } = await AUTHENTICATION.request({
            url: '/sign_in',
            method: 'POST',
            data: { email, password },
            headers: { 'Content-Type': 'application/json' },
          });

          return data;
        } catch (err) {
          if (axios.isAxiosError(err) && err.response) {
            const errorMessage = err.response.data?.errors[0]?.title || 'Login failed';
            throw new Error(errorMessage);
          }
          throw new Error('An unexpected error occurred');
        }
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

export default NextAuth(authOptions);
