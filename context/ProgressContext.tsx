// context/ProgressContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress } from '@/lib/types';
import { progressStorage } from '@/lib/storage';
import { calculateLevel, getUnlockedBadges } from '@/lib/xp-system';

interface ProgressContextType {
  progress: UserProgress;
  addXP: (amount: number) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>({
    totalXP: 0,
    level: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletionDate: null,
    badges: [],
  });

  // Load progress from storage on mount
  useEffect(() => {
    const saved = progressStorage.get();
    setProgress(saved);
  }, []);

  // Save to storage whenever progress changes
  useEffect(() => {
    progressStorage.set(progress);
  }, [progress]);

  const addXP = (amount: number) => {
    setProgress((prev) => {
      const newTotalXP = prev.totalXP + amount;
      const newLevel = calculateLevel(newTotalXP);
      const newBadges = getUnlockedBadges(newLevel);

      return {
        ...prev,
        totalXP: newTotalXP,
        level: newLevel,
        badges: newBadges,
      };
    });
  };

  const updateStreak = () => {
    setProgress((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = prev.lastCompletionDate;

      // If first completion ever
      if (!lastDate) {
        return {
          ...prev,
          currentStreak: 1,
          longestStreak: 1,
          lastCompletionDate: today,
        };
      }

      // If already completed today, don't update
      if (lastDate === today) {
        return prev;
      }

      // Calculate days since last completion
      const lastDateTime = new Date(lastDate).getTime();
      const todayTime = new Date(today).getTime();
      const daysDiff = Math.floor((todayTime - lastDateTime) / (1000 * 60 * 60 * 24));

      // If completed yesterday, continue streak
      if (daysDiff === 1) {
        const newStreak = prev.currentStreak + 1;
        return {
          ...prev,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, prev.longestStreak),
          lastCompletionDate: today,
        };
      }

      // If missed a day, reset streak
      return {
        ...prev,
        currentStreak: 1,
        longestStreak: prev.longestStreak,
        lastCompletionDate: today,
      };
    });
  };

  const resetProgress = () => {
    const initial: UserProgress = {
      totalXP: 0,
      level: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
      badges: [],
    };
    setProgress(initial);
    progressStorage.set(initial);
  };

  return (
    <ProgressContext.Provider value={{ progress, addXP, updateStreak, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}