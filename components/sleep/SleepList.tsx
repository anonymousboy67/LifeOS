// components/sleep/SleepList.tsx
'use client';

import { SleepEntry } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Moon, Trash2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepListProps {
  entries: SleepEntry[];
  onDelete: (id: string) => void;
}

export default function SleepList({ entries, onDelete }: SleepListProps) {
  if (entries.length === 0) {
    return (
      <div className="card bg-stone-50 text-center py-12">
        <Moon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
        <p className="text-stone-500">No sleep entries yet</p>
        <p className="text-sm text-stone-400 mt-1">
          Log your first sleep session above
        </p>
      </div>
    );
  }

  const getQualityColor = (quality: number) => {
    if (quality === 1) return 'bg-red-50 text-red-700 border-red-200';
    if (quality === 2) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (quality === 3) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (quality === 4) return 'bg-lime-50 text-lime-700 border-lime-200';
    return 'bg-green-50 text-green-700 border-green-200';
  };

  const getQualityEmoji = (quality: number) => {
    if (quality === 1) return '😫';
    if (quality === 2) return '😕';
    if (quality === 3) return '😊';
    if (quality === 4) return '😄';
    return '🤩';
  };

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="card group hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-purple-50 border border-purple-200 rounded-lg">
                <Moon className="w-5 h-5 text-purple-600" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-stone-900">
                    {formatDate(entry.date)}
                  </span>
                  <span className={cn('badge text-xs', getQualityColor(entry.quality))}>
                    {getQualityEmoji(entry.quality)} {entry.quality}/5
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-stone-600">
                  <span>🌙 {entry.sleepTime}</span>
                  <span>→</span>
                  <span>☀️ {entry.wakeTime}</span>
                  <span className="text-purple-600 font-medium">
                    {entry.duration}h
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (confirm('Delete this sleep entry?')) {
                  onDelete(entry.id);
                }
              }}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}