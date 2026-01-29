// app/settings/page.tsx
'use client';

import { useProgress } from '@/context/ProgressContext';
import { AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const { progress, resetProgress } = useProgress();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      alert('All progress has been reset.');
    }
  };

  return (
    <div className="animate-in">
      <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
        Settings
      </h1>
      <p className="text-stone-600 mb-8">
        Manage your Life OS preferences
      </p>
      
      <div className="space-y-6">
        {/* Progress Stats */}
        <div className="card">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
            Your Progress
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-600">Total XP</span>
              <span className="font-semibold text-stone-900">{progress.totalXP}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Level</span>
              <span className="font-semibold text-stone-900">{progress.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Current Streak</span>
              <span className="font-semibold text-stone-900">{progress.currentStreak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Longest Streak</span>
              <span className="font-semibold text-stone-900">{progress.longestStreak} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Badges Unlocked</span>
              <span className="font-semibold text-stone-900">{progress.badges.length}</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card border-red-200 bg-red-50">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h2 className="text-xl font-serif font-semibold text-red-900 mb-1">
                Danger Zone
              </h2>
              <p className="text-sm text-red-700">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="btn bg-red-600 text-white hover:bg-red-700"
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}