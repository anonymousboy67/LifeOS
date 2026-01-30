// components/dashboard/ActivityCalendar.tsx
'use client';

import { useState, useMemo } from 'react';
import { DayData } from '@/lib/types';
import { dayDataStorage } from '@/lib/storage';
import { getToday } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivityCalendarProps {
  data?: DayData[];
}

export default function ActivityCalendar({ data }: ActivityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null);

  // Load data from storage
  const dayData = useMemo(() => {
    return data || dayDataStorage.get();
  }, [data]);

  // Create a map for quick lookup
  const dataMap = useMemo(() => {
    const map = new Map<string, DayData>();
    dayData.forEach((day) => map.set(day.date, day));
    return map;
  }, [dayData]);

  // Get days in current month
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth();
  const today = getToday();

  // Calculate intensity based on XP earned
  const getIntensity = (xp: number): number => {
    if (xp === 0) return 0;
    if (xp < 50) return 1;
    if (xp < 100) return 2;
    if (xp < 200) return 3;
    return 4;
  };

  // Get color class based on intensity
  const getColorClass = (intensity: number): string => {
    const colors = [
      'bg-stone-100', // 0 - no activity
      'bg-green-200', // 1 - low
      'bg-green-400', // 2 - medium
      'bg-green-600', // 3 - high
      'bg-green-800', // 4 - very high
    ];
    return colors[intensity];
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDayHover = (day: Date | null, event: React.MouseEvent) => {
    if (!day) {
      setHoveredDay(null);
      setHoveredPosition(null);
      return;
    }

    const dateStr = day.toISOString().split('T')[0];
    const dayInfo = dataMap.get(dateStr);
    
    if (dayInfo) {
      setHoveredDay(dayInfo);
      setHoveredPosition({ x: event.clientX, y: event.clientY });
    } else {
      setHoveredDay(null);
      setHoveredPosition(null);
    }
  };

  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-semibold text-stone-900">
          {monthYear}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-stone-600" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-stone-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dateStr = day.toISOString().split('T')[0];
            const dayInfo = dataMap.get(dateStr);
            const intensity = dayInfo ? getIntensity(dayInfo.xpEarned) : 0;
            const colorClass = getColorClass(intensity);
            const isToday = dateStr === today;

            return (
              <div
                key={dateStr}
                onMouseEnter={(e) => handleDayHover(day, e)}
                onMouseLeave={() => {
                  setHoveredDay(null);
                  setHoveredPosition(null);
                }}
                className={`
                  aspect-square rounded-lg border-2 transition-all duration-200 cursor-pointer
                  ${colorClass}
                  ${isToday ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-transparent'}
                  hover:scale-110 hover:shadow-lg
                  flex items-center justify-center
                `}
              >
                <span className="text-xs font-medium text-stone-700">
                  {day.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 text-xs text-stone-600">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((intensity) => (
            <div
              key={intensity}
              className={`w-4 h-4 rounded ${getColorClass(intensity)} border border-stone-200`}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Tooltip */}
      {hoveredDay && hoveredPosition && (
        <div
          className="fixed z-50 bg-stone-900 text-white px-4 py-3 rounded-lg shadow-xl text-sm pointer-events-none"
          style={{
            left: `${hoveredPosition.x + 10}px`,
            top: `${hoveredPosition.y - 80}px`,
          }}
        >
          <p className="font-semibold mb-2">
            {new Date(hoveredDay.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <div className="space-y-1 text-stone-300">
            <p>✓ {hoveredDay.tasksCompleted} tasks completed</p>
            <p>⚡ {hoveredDay.xpEarned} XP earned</p>
            <p>⏱️ {hoveredDay.focusMinutes}m focus time</p>
            <p>😴 {hoveredDay.sleepHours}h sleep</p>
            <p>💰 ${hoveredDay.moneySpent.toFixed(2)} spent</p>
          </div>
        </div>
      )}
    </div>
  );
}