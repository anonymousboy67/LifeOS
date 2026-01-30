// components/focus/FocusStats.tsx
import { Timer, Target, TrendingUp, Clock } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface FocusStatsProps {
  total: number;
  today: number;
  todayMinutes: number;
  totalMinutes: number;
  averageSession: number;
}

export default function FocusStats({
  total,
  today,
  todayMinutes,
  totalMinutes,
  averageSession,
}: FocusStatsProps) {
  const stats = [
    {
      label: 'Today',
      value: formatDuration(todayMinutes),
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      subtitle: `${today} session${today !== 1 ? 's' : ''}`,
    },
    {
      label: 'Total Sessions',
      value: total,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      subtitle: 'All time',
    },
    {
      label: 'Total Time',
      value: formatDuration(totalMinutes),
      icon: Timer,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      subtitle: 'All time',
    },
    {
      label: 'Average',
      value: formatDuration(averageSession),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      subtitle: 'Per session',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`card ${stat.bgColor} ${stat.borderColor} border-2`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-stone-600">{stat.label}</p>
                <p className={`text-2xl font-serif font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                {stat.subtitle && (
                  <p className="text-xs text-stone-500 mt-0.5">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}