// components/layout/Header.tsx
'use client';

import { useProgress } from '@/context/ProgressContext';
import { Flame, Zap, Trophy } from 'lucide-react';
import { levelProgress, xpForNextLevel } from '@/lib/xp-system';

export default function Header() {
  const { progress } = useProgress();
  const progressPercent = levelProgress(progress.totalXP, progress.level);
  const nextLevelXP = xpForNextLevel(progress.level);

  return (
    <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6">
      {/* Left side - could add breadcrumbs or page title here */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-stone-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Right side - Stats */}
      <div className="flex items-center gap-6">
        {/* Current Streak */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-700">
              {progress.currentStreak}
            </span>
            <span className="text-xs text-orange-600">day streak</span>
          </div>
        </div>

        {/* Level & XP */}
        <div className="flex items-center gap-3">
          {/* Level Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg">
            <Trophy className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-indigo-700">
              Level {progress.level}
            </span>
          </div>

          {/* XP Progress */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-xs font-medium text-stone-700">
                  {progress.totalXP.toLocaleString()} XP
                </span>
              </div>
              <div className="w-32 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs text-stone-500 mt-0.5">
                {nextLevelXP - progress.totalXP} XP to next level
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}