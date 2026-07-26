import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import type { NextAuthOptions, User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // ← УБИРАЕМ адаптер полностью
  session: { strategy: 'jwt' }, // ← оставляем JWT
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const parsed = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
          if (!parsed.success) throw new Error('Некорректные данные');

          const user = await prisma.user.findUnique({
            where: { email: parsed.data.email },
          });
          if (!user) throw new Error('Пользователь не найден');

          const passwordMatch = await bcrypt.compare(parsed.data.password, user.password || '');
          if (!passwordMatch) throw new Error('Неверный пароль');

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          if (
            error instanceof Error &&
            (error.message === 'Некорректные данные' ||
              error.message === 'Пользователь не найден' ||
              error.message === 'Неверный пароль')
          ) {
            throw error;
          }
          Sentry.captureException(error);
          throw new Error('Ошибка авторизации');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
export { handlers, signIn, signOut, auth };