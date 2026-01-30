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
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${crimsonPro.variable} ${dmSans.variable} font-sans`} suppressHydrationWarning>
        <ProgressProvider>
          {/* Mobile: Stack vertically, Desktop: Side-by-side */}
          <div className="flex flex-col md:flex-row min-h-screen bg-stone-50">
            {/* Sidebar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex md:flex-shrink-0">
              <Sidebar />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
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