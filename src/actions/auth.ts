'use server';

import { prisma } from '@/lib/db/prisma';
import { registerSchema } from '@/utils/validation';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { captureException } from '@/lib/sentry';
import { signOut } from '@/auth';

export async function registerUser(formData: FormData) {
  try {
    const rawData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      name: (formData.get('name') as string) || undefined,
    };
    const validatedData = registerSchema.parse(rawData);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { success: false, error: 'Пользователь с таким email уже существует' };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: 'USER',
      },
    });

    return { success: true, user: { id: user.id, email: user.email, name: user.name } };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      return { success: false, error: firstIssue.message };
    }

    captureException(error);
    return { success: false, error: 'Ошибка при регистрации пользователя' };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { success: false, error: 'Заполните все поля' };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: 'Неверный email или пароль' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password || '');
    if (!passwordMatch) {
      return { success: false, error: 'Неверный email или пароль' };
    }

    return { success: true };
  } catch (error) {
    captureException(error);
    return { success: false, error: 'Ошибка сервера при входе' };
  }
}

export async function logoutUser() {
  try {
    await signOut({ redirect: false });
    return { success: true };
  } catch (error) {
    captureException(error);
    return { success: false, error: 'Ошибка при выходе' };
  }
}
