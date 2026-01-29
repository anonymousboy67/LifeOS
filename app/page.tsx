// app/page.tsx
'use client';

import { useProgress } from '@/context/ProgressContext';
import { CheckCircle2, Timer, Moon, Wallet, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { progress } = useProgress();

  const stats = [
    {
      label: 'Tasks Completed',
      value: '0',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'Focus Time',
      value: '0h',
      icon: Timer,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
    {
      label: 'Sleep Average',
      value: '0h',
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      label: 'This Month',
      value: '$0',
      icon: Wallet,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
  ];

  return (
    <div className="space-y-8 animate-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          Welcome back
        </h1>
        <p className="text-stone-600">
          Here's what's happening with your Life OS today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`card ${stat.bgColor} ${stat.borderColor} border-2`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-stone-600">{stat.label}</p>
                <p className={`text-3xl font-serif font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-primary text-left justify-start">
            <CheckCircle2 className="w-5 h-5" />
            <span>Add Task</span>
          </button>
          <button className="btn btn-secondary text-left justify-start">
            <Timer className="w-5 h-5" />
            <span>Start Focus Session</span>
          </button>
          <button className="btn btn-secondary text-left justify-start">
            <TrendingUp className="w-5 h-5" />
            <span>View Insights</span>
          </button>
        </div>
      </div>

      {/* Activity Calendar Placeholder */}
      <div className="card">
        <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
          Activity Calendar
        </h2>
        <div className="h-48 bg-stone-50 rounded-lg border-2 border-dashed border-stone-200 flex items-center justify-center">
          <p className="text-stone-400 text-sm">
            GitHub-style calendar coming in Block 3
          </p>
        </div>
      </div>
    </div>
  );
}