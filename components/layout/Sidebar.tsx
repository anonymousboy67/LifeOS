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
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

  return (
    <div className="w-64 bg-white border-r border-stone-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-stone-200">
        <h1 className="text-2xl font-serif font-bold text-stone-900">
          Life OS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}