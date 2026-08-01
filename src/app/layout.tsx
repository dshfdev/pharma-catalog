import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from './providers';
import { siteConfig } from '@/lib/config/siteConfig';
import { Header } from '@/components/common/Header/Header';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Header />
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
