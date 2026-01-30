// components/tasks/TaskStats.tsx
'use client';

import { CheckCircle2, Circle, TrendingUp, Target } from 'lucide-react';

interface TaskStatsProps {
  total: number;
  active: number;
  completed: number;
  completionRate: number;
}

export default function TaskStats({
  total,
  active,
  completed,
  completionRate,
}: TaskStatsProps) {
  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: Target,
      color: 'text-stone-600',
      bgColor: 'bg-stone-50',
      borderColor: 'border-stone-200',
    },
    {
      label: 'Active',
      value: active,
      icon: Circle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}