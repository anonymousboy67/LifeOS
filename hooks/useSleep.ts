// hooks/useSleep.ts
'use client';

import { useState, useEffect } from 'react';
import { SleepEntry } from '@/lib/types';
import { sleepStorage, dayDataStorage } from '@/lib/storage';
import { generateId, getToday, calculateSleepDuration } from '@/lib/utils';

export function useSleep() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);

  // Load entries from storage on mount
  useEffect(() => {
    const saved = sleepStorage.get();
    setEntries(saved);
  }, []);

  // Save entries whenever they change
  useEffect(() => {
    sleepStorage.set(entries);
  }, [entries]);

  const addEntry = (sleepTime: string, wakeTime: string, quality: 1 | 2 | 3 | 4 | 5, date?: string) => {
    const duration = calculateSleepDuration(sleepTime, wakeTime);
    const entryDate = date || getToday();

    const newEntry: SleepEntry = {
      id: generateId(),
      date: entryDate,
      sleepTime,
      wakeTime,
      duration,
      quality,
    };

    setEntries((prev) => [newEntry, ...prev]);

    // Update day data
    dayDataStorage.updateDay(entryDate, {
      sleepHours: duration,
    });

    return newEntry;
  };

  const deleteEntry = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      // Remove from day data
      dayDataStorage.updateDay(entry.date, {
        sleepHours: 0,
      });
    }
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, sleepTime: string, wakeTime: string, quality: 1 | 2 | 3 | 4 | 5) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;

    const duration = calculateSleepDuration(sleepTime, wakeTime);

    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, sleepTime, wakeTime, duration, quality }
          : e
      )
    );

    // Update day data
    dayDataStorage.updateDay(entry.date, {
      sleepHours: duration,
    });
  };

  // Get entry for specific date
  const getEntryByDate = (date: string) => {
    return entries.find((e) => e.date === date);
  };

  // Calculate stats
  const totalEntries = entries.length;
  const averageDuration = totalEntries > 0
    ? entries.reduce((sum, e) => sum + e.duration, 0) / totalEntries
    : 0;

  const averageQuality = totalEntries > 0
    ? entries.reduce((sum, e) => sum + e.quality, 0) / totalEntries
    : 0;

  // Sleep consistency (entries in last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  });

  const entriesLast7Days = entries.filter((e) => last7Days.includes(e.date));
  const consistency = Math.round((entriesLast7Days.length / 7) * 100);

  // Quality distribution
  const qualityDistribution = {
    1: entries.filter((e) => e.quality === 1).length,
    2: entries.filter((e) => e.quality === 2).length,
    3: entries.filter((e) => e.quality === 3).length,
    4: entries.filter((e) => e.quality === 4).length,
    5: entries.filter((e) => e.quality === 5).length,
  };

  const stats = {
    total: totalEntries,
    averageDuration: Number(averageDuration.toFixed(1)),
    averageQuality: Number(averageQuality.toFixed(1)),
    consistency,
    qualityDistribution,
  };

  return {
    entries,
    stats,
    addEntry,
    deleteEntry,
    updateEntry,
    getEntryByDate,
  };
}