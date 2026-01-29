import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '30-Day Habit Tracker',
  description: 'Transform your life one habit at a time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}