// components/focus/SessionHistory.tsx
'use client';

import { FocusSession } from '@/lib/types';
import { formatDate, formatDuration } from '@/lib/utils';
import { Timer, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionHistoryProps {
  sessions: FocusSession[];
  onDelete: (id: string) => void;
}

export default function SessionHistory({ sessions, onDelete }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="card bg-stone-50 text-center py-12">
        <Timer className="w-12 h-12 text-stone-300 mx-auto mb-3" />
        <p className="text-stone-500">No focus sessions yet</p>
        <p className="text-sm text-stone-400 mt-1">
          Start your first deep work session above
        </p>
      </div>
    );
  }

  // Group sessions by date
  const groupedSessions = sessions.reduce((groups, session) => {
    const date = new Date(session.startTime).toISOString().split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, FocusSession[]>);

  const sortedDates = Object.keys(groupedSessions).sort((a, b) => b.localeCompare(a));

  const getModeColor = (mode: string) => {
    switch (mode) {
      case '25':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '50':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => {
        const dateSessions = groupedSessions[date];
        const totalMinutes = dateSessions.reduce((sum, s) => sum + s.duration, 0);

        return (
          <div key={date} className="space-y-3">
            {/* Date Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
                {formatDate(date)}
              </h3>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(totalMinutes)}</span>
                <span className="text-stone-400">•</span>
                <span>{dateSessions.length} session{dateSessions.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Sessions */}
            <div className="space-y-2">
              {dateSessions.map((session) => {
                const startTime = new Date(session.startTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                });
                const endTime = new Date(session.endTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={session.id}
                    className="card group hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                          <Timer className="w-5 h-5 text-indigo-600" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={cn('badge text-xs', getModeColor(session.mode))}>
                              {session.mode === 'custom' ? `${session.duration}m` : `${session.mode}m`}
                            </span>
                            <span className="text-sm font-medium text-stone-900">
                              Deep Work Session
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">
                            {startTime} - {endTime} • {formatDuration(session.duration)}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Delete this session?')) {
                            onDelete(session.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}