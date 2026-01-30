// components/dashboard/RecentActivity.tsx
'use client';

import { Task } from '@/lib/types';
import { CheckCircle2, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { XP_VALUES } from '@/lib/xp-system';
import { cn } from '@/lib/utils';

interface RecentActivityProps {
  tasks: Task[];
  limit?: number;
}

export default function RecentActivity({ tasks, limit = 5 }: RecentActivityProps) {
  // Get completed tasks, sorted by completion date
  const completedTasks = tasks
    .filter((t) => t.completed && t.completedAt)
    .sort((a, b) => {
      const dateA = new Date(a.completedAt!).getTime();
      const dateB = new Date(b.completedAt!).getTime();
      return dateB - dateA;
    })
    .slice(0, limit);

  if (completedTasks.length === 0) {
    return (
      <div className="card bg-stone-50 text-center py-12">
        <Clock className="w-12 h-12 text-stone-300 mx-auto mb-3" />
        <p className="text-stone-500">No recent activity</p>
        <p className="text-sm text-stone-400 mt-1">
          Complete some tasks to see them here
        </p>
      </div>
    );
  }

  const priorityColors = {
    high: 'badge-high',
    medium: 'badge-medium',
    low: 'badge-low',
  };

  return (
    <div className="card">
      <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">
        Recent Activity
      </h3>
      
      <div className="space-y-3">
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg border border-stone-200 hover:bg-stone-100 transition-colors"
          >
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-900 line-through">
                {task.title}
              </p>
              
              <div className="flex items-center gap-2 mt-1">
                <span className={cn('badge text-xs', priorityColors[task.priority])}>
                  {task.priority}
                </span>
                
                <span className="text-xs text-green-600 font-medium">
                  +{XP_VALUES[task.priority]} XP
                </span>
                
                <span className="text-xs text-stone-500">
                  {formatDate(task.completedAt!)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}