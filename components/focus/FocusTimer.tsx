// components/focus/FocusTimer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { FocusMode } from '@/hooks/useFocus';

interface FocusTimerProps {
  mode: FocusMode;
  customMinutes?: number;
  onComplete: (mode: FocusMode, duration: number) => void;
  onClose: () => void;
}

export default function FocusTimer({
  mode,
  customMinutes = 25,
  onComplete,
  onClose,
}: FocusTimerProps) {
  const getDuration = () => {
    if (mode === 'custom') return customMinutes;
    return mode === '25' ? 25 : 50;
  };

  const totalSeconds = getDuration() * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            playCompletionSound();
            onComplete(mode, getDuration());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, secondsLeft]);

  const playCompletionSound = () => {
    // Create a simple beep sound
    if (typeof window !== 'undefined' && window.AudioContext) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
    setIsCompleted(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 bg-stone-900 z-50 flex flex-col items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 hover:bg-stone-800 rounded-full transition-colors text-stone-400 hover:text-white"
        aria-label="Close timer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Mode Label */}
      <div className="absolute top-6 left-6 px-4 py-2 bg-stone-800 rounded-lg border border-stone-700">
        <p className="text-sm text-stone-400">
          {mode === 'custom' ? `${customMinutes} min` : `${mode} min`} Deep Work
        </p>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center space-y-12">
        {/* Progress Ring */}
        <div className="relative">
          <svg className="w-80 h-80 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="160"
              cy="160"
              r="150"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-stone-800"
            />
            {/* Progress circle */}
            <circle
              cx="160"
              cy="160"
              r="150"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 150}`}
              strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
              className="text-indigo-500 transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>

          {/* Time Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-8xl font-serif font-bold text-white tracking-tight">
                {formatTime(secondsLeft)}
              </p>
              {isCompleted && (
                <p className="text-2xl text-green-400 mt-4 animate-fade-in">
                  Session Complete! 🎉
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {!isCompleted && (
            <>
              <button
                onClick={toggleTimer}
                className="p-6 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isRunning ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>

              <button
                onClick={resetTimer}
                className="p-6 bg-stone-800 hover:bg-stone-700 rounded-full transition-all duration-200"
              >
                <RotateCcw className="w-8 h-8 text-stone-300" />
              </button>
            </>
          )}

          {isCompleted && (
            <button
              onClick={onClose}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Close & Save
            </button>
          )}
        </div>

        {/* Instructions */}
        {!isRunning && !isCompleted && (
          <p className="text-stone-500 text-center max-w-md">
            Click play to start your deep work session. Stay focused and avoid distractions.
          </p>
        )}

        {isRunning && (
          <p className="text-stone-500 text-center max-w-md animate-pulse">
            Focus mode active. Minimize distractions and stay in the zone.
          </p>
        )}
      </div>
    </div>
  );
}