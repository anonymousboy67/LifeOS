// app/focus/page.tsx
'use client';

import { useState } from 'react';
import { useFocus, FocusMode } from '@/hooks/useFocus';
import FocusTimer from '@/components/focus/FocusTimer';
import SessionHistory from '@/components/focus/SessionHistory';
import FocusStats from '@/components/focus/FocusStats';
import { Timer, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FocusPage() {
  const { sessions, stats, addSession, deleteSession } = useFocus();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState<FocusMode>('25');
  const [customMinutes, setCustomMinutes] = useState(25);

  const handleStartTimer = (mode: FocusMode) => {
    setSelectedMode(mode);
    setIsTimerActive(true);
  };

  const handleTimerComplete = (mode: FocusMode, duration: number) => {
    addSession(mode, duration);
  };

  const handleTimerClose = () => {
    setIsTimerActive(false);
  };

  const modes: { mode: FocusMode; label: string; minutes: number; color: string; description: string }[] = [
    {
      mode: '25',
      label: '25 Minutes',
      minutes: 25,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      description: 'Pomodoro technique',
    },
    {
      mode: '50',
      label: '50 Minutes',
      minutes: 50,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      description: 'Deep work session',
    },
    {
      mode: 'custom',
      label: 'Custom',
      minutes: customMinutes,
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      description: 'Set your own time',
    },
  ];

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          Deep Work
        </h1>
        <p className="text-stone-600">
          Track your focus sessions and build concentration
        </p>
      </div>

      {/* Stats */}
      <FocusStats
        total={stats.total}
        today={stats.today}
        todayMinutes={stats.todayMinutes}
        totalMinutes={stats.totalMinutes}
        averageSession={stats.averageSession}
      />

      {/* Start Session */}
      <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white rounded-lg border-2 border-indigo-200">
            <Timer className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold text-stone-900">
              Start Focus Session
            </h2>
            <p className="text-sm text-stone-600">
              Choose your deep work duration
            </p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modes.map((modeOption) => (
            <div key={modeOption.mode} className="space-y-2">
              <button
                onClick={() => {
                  if (modeOption.mode === 'custom') {
                    // Show custom input
                  } else {
                    handleStartTimer(modeOption.mode);
                  }
                }}
                disabled={modeOption.mode === 'custom' && customMinutes < 1}
                className={cn(
                  'w-full p-6 rounded-lg border-2 transition-all duration-200',
                  'hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
                  modeOption.color
                )}
              >
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold text-stone-900 mb-2">
                    {modeOption.mode === 'custom' ? customMinutes : modeOption.minutes}
                  </p>
                  <p className="text-sm font-medium text-stone-700 mb-1">
                    {modeOption.label}
                  </p>
                  <p className="text-xs text-stone-500">
                    {modeOption.description}
                  </p>
                </div>
              </button>

              {modeOption.mode === 'custom' && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input text-center"
                    placeholder="Minutes"
                  />
                  <button
                    onClick={() => handleStartTimer('custom')}
                    disabled={customMinutes < 1}
                    className="btn btn-primary whitespace-nowrap"
                  >
                    Start
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 bg-white/50 rounded-lg border border-indigo-200">
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-stone-900">Pro Tip</p>
              <p className="text-xs text-stone-600 mt-1">
                For best results, eliminate all distractions before starting your session.
                Turn off notifications and close unnecessary tabs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div>
        <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
          Session History
        </h2>
        <SessionHistory sessions={sessions} onDelete={deleteSession} />
      </div>

      {/* Timer Modal */}
      {isTimerActive && (
        <FocusTimer
          mode={selectedMode}
          customMinutes={customMinutes}
          onComplete={handleTimerComplete}
          onClose={handleTimerClose}
        />
      )}
    </div>
  );
}