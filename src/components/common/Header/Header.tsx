'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Modal';
import { LoginForm } from '@/components/forms/LoginForm';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { useState } from 'react';
import Link from 'next/link';
import { LogOut, User, Menu } from 'lucide-react';
import styles from './Header.module.css';
import commonStyles from '@/styles/common.module.css';

export function Header() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <header className={styles.header}>
        <div className={`${commonStyles.container} flex justify-between items-center py-3 px-4`}>
          <div className="text-xl font-bold text-slate-800 dark:text-white">Pharma Catalog</div>
          <div className="w-24 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={`${commonStyles.container} flex justify-between items-center py-3`}>
        <Link href="/" className={styles.logo}>
          Pharma Catalog
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <User className="w-4 h-4" />
                Пользователь
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button>Войти</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Вход</DialogTitle>
                  </DialogHeader>
                  <LoginForm />
                </DialogContent>
              </Dialog>

              <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Регистрация</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Регистрация</DialogTitle>
                  </DialogHeader>
                  <RegisterForm />
                </DialogContent>
              </Dialog>
            </>
          )}
        </nav>

        <button
          className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={`${styles.mobileMenu} md:hidden`}>
          <nav className="flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <User className="w-4 h-4" />
                  Пользователь
                </span>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Войти
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRegisterOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Регистрация
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
