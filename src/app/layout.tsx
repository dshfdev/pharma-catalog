import type { Metadata } from "next";
import { ReactNode } from 'react';
import { Providers } from './providers';
import { siteConfig } from '../lib/config/siteConfig';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
