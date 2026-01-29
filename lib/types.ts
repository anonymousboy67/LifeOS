// lib/types.ts

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  createdAt: string;
  completed: boolean;
  completedAt?: string;
  priority: Priority;
}

export interface FocusSession {
  id: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  mode: '25' | '50' | 'custom';
}

export interface SleepEntry {
  id: string;
  date: string;
  sleepTime: string;
  wakeTime: string;
  duration: number; // hours
  quality: 1 | 2 | 3 | 4 | 5;
}

export type ExpenseCategory = 'food' | 'transport' | 'subscriptions' | 'fun' | 'learning' | 'misc';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  note?: string;
}

export interface UserProgress {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
  badges: string[];
}

export interface DayData {
  date: string;
  tasksCompleted: number;
  xpEarned: number;
  focusMinutes: number;
  sleepHours: number;
  moneySpent: number;
}