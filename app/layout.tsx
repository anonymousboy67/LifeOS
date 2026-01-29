// app/layout.tsx
import type { Metadata } from 'next';
import { Crimson_Pro, DM_Sans } from 'next/font/google';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Life OS - Your Personal Operating System',
  description: 'Track tasks, focus time, sleep, and expenses in one calm space',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${crimsonPro.variable} ${dmSans.variable} font-sans`}>
        <ProgressProvider>
          <div className="flex h-screen bg-stone-50">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}