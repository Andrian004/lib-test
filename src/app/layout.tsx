import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Product & User Management',
  description: 'Dashboard modern dengan Next.js + Prisma + PostgreSQL',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
