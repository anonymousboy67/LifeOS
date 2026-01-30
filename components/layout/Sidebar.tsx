// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Timer, 
  Moon, 
  Wallet,
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Focus', href: '/focus', icon: Timer },
  { name: 'Sleep', href: '/sleep', icon: Moon },
  { name: 'Expenses', href: '/expenses', icon: Wallet },
  { name: 'Insights', href: '/insights', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button - Fixed at bottom */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-40 p-4 bg-stone-900 text-white rounded-full shadow-lg hover:bg-stone-800 transition-all"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile: Slide from right, Desktop: Always visible */}
      <div
        className={cn(
          'fixed md:relative inset-y-0 right-0 md:right-auto md:left-0 z-50 md:z-auto w-64 bg-white border-l md:border-r md:border-l-0 border-stone-200 flex flex-col transform transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-stone-600" />
        </button>

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-stone-200">
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            Life OS
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'text-sm font-medium',
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="px-3 pb-6">
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all duration-200"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
}