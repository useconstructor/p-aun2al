import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artisan Collective',
  description: 'A premium direct-to-consumer marketplace where customers discover authentic handmade jewelry from verified independent makers, while artisans manage products, inventory, orders, and storefronts through a secure dashboard. The experience combines curated shopping, transparent sourcing stories, customization, and subscription tools for sellers.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#F9F7F4', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
