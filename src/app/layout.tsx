import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'City Guide X',
  description: 'The best alternative to booking.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-primary">
      <body className={inter.className}>
        <Toaster toastOptions={{ style: { zIndex: 999999999999 } }} position="bottom-left" />
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
