'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerUser } from '@/actions/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './Form.module.css';

const registerSchema = z
  .object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Подтверждение пароля обязательно'),
    name: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      if (data.name) formData.append('name', data.name);

      const result = await registerUser(formData);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Ошибка регистрации');
      }
    } catch (error) {
      setError('Произошла непредвиденная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return <div className={styles.success}>Регистрация успешна! Теперь вы можете войти.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <Input type="email" placeholder="Email" {...register('email')} className={styles.input} />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <Input
          type="text"
          placeholder="Имя (опционально)"
          {...register('name')}
          className={styles.input}
        />
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

      <div className={styles.field}>
        <Input
          type="password"
          placeholder="Подтвердите пароль"
          {...register('confirmPassword')}
          className={styles.input}
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
}
