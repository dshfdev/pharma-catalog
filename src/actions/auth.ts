'use server';

import { prisma } from '../lib/db/prisma';
import { registerSchema } from '../utils/validation';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export async function registerUser(formData: FormData) {
  try {
    const rawData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      name: formData.get('name') as string || undefined,
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
    console.error('Ошибка регистрации:', error);
    return { success: false, error: 'Ошибка при регистрации пользователя' };
  }
}