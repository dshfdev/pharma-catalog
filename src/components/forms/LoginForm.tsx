'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { signIn } from 'next-auth/react';
import styles from './Form.module.css';

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const validation = await loginUser(formData);

      if (!validation.success) {
        setError(validation.error ?? 'Ошибка входа');
        return;
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Неверный email или пароль');
      } else {
        router.refresh();
        router.push('/');
      }
    } catch (error) {
      setError('Произошла непредвиденная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <Input type="email" placeholder="Email" {...register('email')} className={styles.input} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <Input
          type="password"
          placeholder="Пароль"
          {...register('password')}
          className={styles.input}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
}
