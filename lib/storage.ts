// lib/storage.ts
import { Task, FocusSession, SleepEntry, Expense, UserProgress, DayData } from './types';

const KEYS = {
  TASKS: 'lifeos_tasks',
  FOCUS: 'lifeos_focus',
  SLEEP: 'lifeos_sleep',
  EXPENSES: 'lifeos_expenses',
  PROGRESS: 'lifeos_progress',
  DAY_DATA: 'lifeos_day_data',
} as const;

// Generic storage helpers
function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage error:', error);
  }
}

// Task storage
export const taskStorage = {
  get: (): Task[] => getItem(KEYS.TASKS, []),
  set: (tasks: Task[]) => setItem(KEYS.TASKS, tasks),
};

// Focus session storage
export const focusStorage = {
  get: (): FocusSession[] => getItem(KEYS.FOCUS, []),
  set: (sessions: FocusSession[]) => setItem(KEYS.FOCUS, sessions),
};

// Sleep entry storage
export const sleepStorage = {
  get: (): SleepEntry[] => getItem(KEYS.SLEEP, []),
  set: (entries: SleepEntry[]) => setItem(KEYS.SLEEP, entries),
};

// Expense storage
export const expenseStorage = {
  get: (): Expense[] => getItem(KEYS.EXPENSES, []),
  set: (expenses: Expense[]) => setItem(KEYS.EXPENSES, expenses),
};

// User progress storage
export const progressStorage = {
  get: (): UserProgress => 
    getItem(KEYS.PROGRESS, {
      totalXP: 0,
      level: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
      badges: [],
    }),
  set: (progress: UserProgress) => setItem(KEYS.PROGRESS, progress),
};

// Day data storage (for calendar visualization)
export const dayDataStorage = {
  get: (): DayData[] => getItem(KEYS.DAY_DATA, []),
  set: (data: DayData[]) => setItem(KEYS.DAY_DATA, data),
  
  // Update or create day data
  updateDay: (date: string, updates: Partial<Omit<DayData, 'date'>>) => {
    const allData = dayDataStorage.get();
    const existing = allData.find(d => d.date === date);
    
    if (existing) {
      const updated = allData.map(d => 
        d.date === date ? { ...d, ...updates } : d
      );
      dayDataStorage.set(updated);
    } else {
      const newDay: DayData = {
        date,
        tasksCompleted: 0,
        xpEarned: 0,
        focusMinutes: 0,
        sleepHours: 0,
        moneySpent: 0,
        ...updates,
      };
      dayDataStorage.set([...allData, newDay]);
    }
  },
};