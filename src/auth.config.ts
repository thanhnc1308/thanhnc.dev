import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';

const isAdminRoutes = (path: string) => path.startsWith('/admin');
const isProtectedRoutes = (path: string) => ['TODO'].includes(path);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAdmin = (user: any) => !!user;
const shouldRedirectToDefault = (path: string) =>
  path.startsWith('/login') || path.startsWith('/signup');

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        // const { email, password } = parsedCredentials.data;
        // const user = await getUser(email);

        // if (!user) {
        //   return null;
        // }

        // const passwordsMatch = await bcrypt.compare(password, user.password);
        // if (!passwordsMatch) {
        //   return null;
        // }

        // return user;

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user;
      const path = nextUrl.pathname;

      if (isAdminRoutes(path) && !isAdmin(user)) {
        return Response.redirect(new URL('/404', nextUrl));
      }

      if (isProtectedRoutes(path) && !isLoggedIn) {
        return false;
      }

      if (shouldRedirectToDefault(path) && isLoggedIn) {
        if (isAdmin(user)) {
          return Response.redirect(new URL('/admin/guest-list', nextUrl));
        }

        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
