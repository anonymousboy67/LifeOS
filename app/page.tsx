// app/page.tsx
'use client';

import { useProgress } from '@/context/ProgressContext';
import { useTasks } from '@/hooks/useTasks';
import { useFocus } from '@/hooks/useFocus';
import { CheckCircle2, Timer, Moon, Wallet, TrendingUp, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import ActivityCalendar from '@/components/dashboard/ActivityCalendar';
import StatsCard from '@/components/dashboard/StatsCard';
import LevelBadge from '@/components/dashboard/LevelBadge';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { formatDuration } from '@/lib/utils';

export default function Dashboard() {
  const { progress } = useProgress();
  const { stats: taskStats, tasks } = useTasks();
  const { stats: focusStats } = useFocus();

  return (
    <div className="space-y-8 animate-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          Welcome back
        </h1>
        <p className="text-stone-600">
          Here's what's happening with your Life OS today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/tasks">
          <StatsCard
            label="Tasks Completed"
            value={taskStats.completed}
            icon={CheckCircle2}
            color="text-green-600"
            bgColor="bg-green-50"
            borderColor="border-green-200"
            subtitle={`${taskStats.active} active tasks`}
          />
        </Link>

        <Link href="/focus">
          <StatsCard
            label="Focus Time"
            value={formatDuration(focusStats.todayMinutes)}
            icon={Timer}
            color="text-indigo-600"
            bgColor="bg-indigo-50"
            borderColor="border-indigo-200"
            subtitle={`${focusStats.today} session${focusStats.today !== 1 ? 's' : ''} today`}
          />
        </Link>

        <Link href="/sleep">
          <StatsCard
            label="Sleep Average"
            value="0h"
            icon={Moon}
            color="text-purple-600"
            bgColor="bg-purple-50"
            borderColor="border-purple-200"
            subtitle="No data yet"
          />
        </Link>

        <Link href="/expenses">
          <StatsCard
            label="This Month"
            value="$0"
            icon={Wallet}
            color="text-amber-600"
            bgColor="bg-amber-50"
            borderColor="border-amber-200"
            subtitle="Total spending"
          />
        </Link>
      </div>

      {/* Level Badge */}
      <LevelBadge
        level={progress.level}
        totalXP={progress.totalXP}
        badges={progress.badges}
      />

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tasks" className="btn btn-primary">
            <CheckCircle2 className="w-5 h-5" />
            <span>Add Task</span>
          </Link>
          <Link href="/focus" className="btn btn-secondary">
            <Timer className="w-5 h-5" />
            <span>Start Focus Session</span>
          </Link>
          <Link href="/insights" className="btn btn-secondary">
            <TrendingUp className="w-5 h-5" />
            <span>View Insights</span>
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Calendar - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-6">
              Activity Calendar
            </h2>
            <ActivityCalendar />
          </div>
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity tasks={tasks} limit={5} />
        </div>
      </div>

      {/* Today's Focus */}
      <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-2">
              Today's Focus
            </h2>
            <p className="text-sm text-stone-600 mb-4">
              What matters most today?
            </p>
            
            {taskStats.active > 0 ? (
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-stone-700">
                  You have <strong>{taskStats.active} active tasks</strong>
                </span>
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                No active tasks. Add one to get started!
              </p>
            )}
          </div>
          
          <Link
            href="/tasks"
            className="btn btn-primary"
          >
            View Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}