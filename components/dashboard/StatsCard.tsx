// components/dashboard/StatsCard.tsx
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  color = 'text-stone-600',
  bgColor = 'bg-stone-50',
  borderColor = 'border-stone-200',
  subtitle,
  trend,
}: StatsCardProps) {
  return (
    <div className={cn('card', bgColor, borderColor, 'border-2')}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-lg border', bgColor, borderColor)}>
          <Icon className={cn('w-6 h-6', color)} />
        </div>
        
        {trend && (
          <div
            className={cn(
              'text-xs font-semibold px-2 py-1 rounded-full',
              trend.isPositive
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-stone-600">{label}</p>
        <p className={cn('text-3xl font-serif font-bold', color)}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-stone-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}