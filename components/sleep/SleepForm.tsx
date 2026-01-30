// components/sleep/SleepForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { Moon, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepFormProps {
  onSubmit: (sleepTime: string, wakeTime: string, quality: 1 | 2 | 3 | 4 | 5) => void;
  onCancel?: () => void;
}

export default function SleepForm({ onSubmit, onCancel }: SleepFormProps) {
  const [sleepTime, setSleepTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(3);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(sleepTime, wakeTime, quality);
    
    // Reset form
    setSleepTime('22:00');
    setWakeTime('07:00');
    setQuality(3);
  };

  const qualityOptions = [
    { value: 1, label: 'Poor', emoji: '😫', color: 'hover:bg-red-100 hover:border-red-300' },
    { value: 2, label: 'Fair', emoji: '😕', color: 'hover:bg-orange-100 hover:border-orange-300' },
    { value: 3, label: 'Good', emoji: '😊', color: 'hover:bg-yellow-100 hover:border-yellow-300' },
    { value: 4, label: 'Great', emoji: '😄', color: 'hover:bg-lime-100 hover:border-lime-300' },
    { value: 5, label: 'Excellent', emoji: '🤩', color: 'hover:bg-green-100 hover:border-green-300' },
  ];

  return (
    <form onSubmit={handleSubmit} className="card bg-purple-50 border-purple-200">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg border border-purple-200">
            <Moon className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-serif font-semibold text-stone-900">
            Log Sleep
          </h3>
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sleep-time" className="block text-sm font-medium text-stone-700 mb-2">
              Sleep Time
            </label>
            <input
              id="sleep-time"
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="wake-time" className="block text-sm font-medium text-stone-700 mb-2">
              Wake Time
            </label>
            <input
              id="wake-time"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        {/* Quality Selection */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-3">
            Sleep Quality
          </label>
          <div className="grid grid-cols-5 gap-2">
            {qualityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setQuality(option.value as 1 | 2 | 3 | 4 | 5)}
                className={cn(
                  'p-3 rounded-lg border-2 transition-all duration-200 text-center',
                  quality === option.value
                    ? 'border-purple-400 bg-purple-100 shadow-sm'
                    : 'border-stone-200 bg-white',
                  option.color
                )}
              >
                <div className="text-2xl mb-1">{option.emoji}</div>
                <div className="text-xs font-medium text-stone-700">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="btn btn-primary flex-1"
          >
            <Plus className="w-4 h-4" />
            <span>Log Sleep</span>
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}