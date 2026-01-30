// hooks/useFocus.ts
'use client';

import { useState, useEffect } from 'react';
import { FocusSession } from '@/lib/types';
import { focusStorage, dayDataStorage } from '@/lib/storage';
import { generateId, getToday } from '@/lib/utils';

export type FocusMode = '25' | '50' | 'custom';

export function useFocus() {
  const [sessions, setSessions] = useState<FocusSession[]>([]);

  // Load sessions from storage on mount
  useEffect(() => {
    const saved = focusStorage.get();
    setSessions(saved);
  }, []);

  // Save sessions whenever they change
  useEffect(() => {
    focusStorage.set(sessions);
  }, [sessions]);

  const addSession = (mode: FocusMode, duration: number) => {
    const now = new Date();
    const endTime = new Date(now.getTime() + duration * 60 * 1000);

    const newSession: FocusSession = {
      id: generateId(),
      startTime: now.toISOString(),
      endTime: endTime.toISOString(),
      duration,
      mode,
    };

    setSessions((prev) => [newSession, ...prev]);

    // Update day data
    const today = getToday();
    dayDataStorage.updateDay(today, {
      focusMinutes: duration,
    });

    return newSession;
  };

  const deleteSession = (id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      // Subtract from day data
      const sessionDate = new Date(session.startTime).toISOString().split('T')[0];
      dayDataStorage.updateDay(sessionDate, {
        focusMinutes: -session.duration,
      });
    }
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  // Get sessions for today
  const todaySessions = sessions.filter((s) => {
    const sessionDate = new Date(s.startTime).toISOString().split('T')[0];
    return sessionDate === getToday();
  });

  // Calculate total focus time today
  const todayFocusMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

  // Get sessions by date
  const getSessionsByDate = (date: string) => {
    return sessions.filter((s) => {
      const sessionDate = new Date(s.startTime).toISOString().split('T')[0];
      return sessionDate === date;
    });
  };

  // Stats
  const stats = {
    total: sessions.length,
    today: todaySessions.length,
    todayMinutes: todayFocusMinutes,
    totalMinutes: sessions.reduce((sum, s) => sum + s.duration, 0),
    averageSession: sessions.length > 0
      ? Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length)
      : 0,
  };

  return {
    sessions,
    todaySessions,
    stats,
    addSession,
    deleteSession,
    getSessionsByDate,
  };
}