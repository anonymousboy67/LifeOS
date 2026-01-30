// components/dashboard/LevelBadge.tsx
'use client';

import { Trophy, Sparkles } from 'lucide-react';
import { levelProgress, xpForNextLevel } from '@/lib/xp-system';

interface LevelBadgeProps {
  level: number;
  totalXP: number;
  badges: string[];
}

export default function LevelBadge({ level, totalXP, badges }: LevelBadgeProps) {
  const progress = levelProgress(totalXP, level);
  const nextLevelXP = xpForNextLevel(level);
  const currentLevelXP = level * level * 100;
  const xpInLevel = totalXP - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;

  return (
    <div className="card bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-serif font-semibold text-stone-900">
              Level {level}
            </h3>
          </div>
          <p className="text-sm text-stone-600">
            {xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-indigo-200 shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-lg font-serif font-bold text-indigo-600">
            {totalXP.toLocaleString()}
          </span>
          <span className="text-xs text-stone-600">total XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-3 bg-white rounded-full overflow-hidden border-2 border-indigo-200">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full w-full animate-pulse-slow bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>
        <p className="text-xs text-stone-500 mt-2 text-right">
          {progress}% to Level {level + 1}
        </p>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div>
          <p className="text-sm font-medium text-stone-700 mb-3">
            Unlocked Badges ({badges.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <div
                key={badge}
                className="px-3 py-1.5 bg-white border-2 border-indigo-200 rounded-full text-xs font-medium text-indigo-700 shadow-sm"
              >
                🏆 {badge}
              </div>
            ))}
          </div>
        </div>
      )}

      {badges.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-stone-500">
            Complete more tasks to unlock badges!
          </p>
        </div>
      )}
    </div>
  );
}