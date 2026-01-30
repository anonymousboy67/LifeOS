// app/sleep/page.tsx
'use client';

import { useState } from 'react';
import { useSleep } from '@/hooks/useSleep';
import SleepForm from '@/components/sleep/SleepForm';
import SleepList from '@/components/sleep/SleepList';
import { Moon, TrendingUp, Target, Star } from 'lucide-react';

export default function SleepPage() {
  const { entries, stats, addEntry, deleteEntry } = useSleep();
  const [showForm, setShowForm] = useState(false);

  const handleAddEntry = (sleepTime: string, wakeTime: string, quality: 1 | 2 | 3 | 4 | 5) => {
    addEntry(sleepTime, wakeTime, quality);
    setShowForm(false);
  };

  const statCards = [
    {
      label: 'Average Duration',
      value: `${stats.averageDuration}h`,
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      subtitle: 'Per night',
    },
    {
      label: 'Average Quality',
      value: `${stats.averageQuality}/5`,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      subtitle: 'Rating',
    },
    {
      label: 'Consistency',
      value: `${stats.consistency}%`,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      subtitle: 'Last 7 days',
    },
    {
      label: 'Total Nights',
      value: stats.total,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      subtitle: 'Tracked',
    },
  ];

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          Sleep Tracking
        </h1>
        <p className="text-stone-600">
          Monitor your sleep patterns and quality
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
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

      {/* Add Entry Section */}
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <Moon className="w-4 h-4" />
            <span>Log Sleep</span>
          </button>
        ) : (
          <SleepForm
            onSubmit={handleAddEntry}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {/* Sleep Tips */}
      <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <h2 className="text-lg font-serif font-semibold text-stone-900 mb-3">
          Sleep Tips
        </h2>
        <ul className="space-y-2 text-sm text-stone-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600">•</span>
            <span>Aim for 7-9 hours of sleep each night</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600">•</span>
            <span>Keep a consistent sleep schedule, even on weekends</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600">•</span>
            <span>Avoid screens 1 hour before bedtime</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600">•</span>
            <span>Keep your bedroom cool, dark, and quiet</span>
          </li>
        </ul>
      </div>

      {/* Sleep History */}
      <div>
        <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
          Sleep History
        </h2>
        <SleepList entries={entries} onDelete={deleteEntry} />
      </div>
    </div>
  );
}