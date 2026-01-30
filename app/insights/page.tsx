// app/insights/page.tsx
'use client';

import { useTasks } from '@/hooks/useTasks';
import { useFocus } from '@/hooks/useFocus';
import { useSleep } from '@/hooks/useSleep';
import { useExpenses } from '@/hooks/useExpenses';
import { useProgress } from '@/context/ProgressContext';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Timer, 
  Wallet,
  Award,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { formatDuration, formatCurrency } from '@/lib/utils';

export default function InsightsPage() {
  const { stats: taskStats, tasksByPriority } = useTasks();
  const { stats: focusStats } = useFocus();
  const { stats: sleepStats } = useSleep();
  const { stats: expenseStats } = useExpenses();
  const { progress } = useProgress();

  const getCurrentMonth = () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getTopCategory = () => {
    const entries = Object.entries(expenseStats.byCategory);
    if (entries.length === 0) return null;
    return entries.reduce((max, entry) => entry[1] > max[1] ? entry : max);
  };

  const topExpenseCategory = getTopCategory();

  // Generate insights
  const insights = [
    {
      condition: sleepStats.averageDuration >= 7 && sleepStats.averageDuration <= 9,
      text: "Your sleep is in the optimal range (7-9h). Great job maintaining healthy sleep habits!",
      type: 'positive',
    },
    {
      condition: sleepStats.averageDuration < 7 && sleepStats.total > 0,
      text: `You're averaging ${sleepStats.averageDuration}h of sleep. Try to increase it to 7-9h for better productivity.`,
      type: 'warning',
    },
    {
      condition: taskStats.completionRate >= 70,
      text: `You're completing ${taskStats.completionRate}% of your tasks. Excellent follow-through!`,
      type: 'positive',
    },
    {
      condition: taskStats.completionRate < 50 && taskStats.total > 5,
      text: `Your task completion rate is ${taskStats.completionRate}%. Consider breaking tasks into smaller chunks.`,
      type: 'warning',
    },
    {
      condition: focusStats.averageSession >= 45,
      text: `Your average focus session is ${focusStats.averageSession} minutes. You're building deep work capacity!`,
      type: 'positive',
    },
    {
      condition: progress.currentStreak >= 7,
      text: `${progress.currentStreak}-day streak! You're building serious momentum.`,
      type: 'positive',
    },
    {
      condition: sleepStats.consistency >= 80,
      text: `${sleepStats.consistency}% sleep consistency. Your routine is solid!`,
      type: 'positive',
    },
    {
      condition: topExpenseCategory !== null && topExpenseCategory[1] > expenseStats.monthTotal * 0.4,
      text: topExpenseCategory ? `${Math.round((topExpenseCategory[1] / expenseStats.monthTotal) * 100)}% of spending is on ${topExpenseCategory[0]}. Consider if this aligns with your priorities.` : '',
      type: 'info',
    },
  ].filter(insight => insight.condition);

  const summaryCards = [
    {
      label: 'Total XP',
      value: progress.totalXP.toLocaleString(),
      icon: Zap,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
    {
      label: 'Tasks Completed',
      value: taskStats.completed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'Focus Hours',
      value: formatDuration(focusStats.totalMinutes),
      icon: Timer,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Current Streak',
      value: `${progress.currentStreak} days`,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          Monthly Insights
        </h1>
        <p className="text-stone-600">
          {getCurrentMonth()} • Your Life OS Report
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`card ${card.bgColor} ${card.borderColor} border-2`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${card.bgColor} border ${card.borderColor}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm text-stone-600">{card.label}</p>
                  <p className={`text-2xl font-serif font-bold ${card.color}`}>
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg border border-indigo-200">
              <Lightbulb className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-stone-900">
              Insights & Patterns
            </h2>
          </div>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  insight.type === 'positive'
                    ? 'bg-green-50 border-green-200'
                    : insight.type === 'warning'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <p className="text-sm text-stone-700">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Breakdown */}
        <div className="card">
          <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">
            Task Priorities
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-stone-700">High Priority</span>
              </div>
              <span className="text-lg font-serif font-bold text-red-600">
                {tasksByPriority.high.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-stone-700">Medium Priority</span>
              </div>
              <span className="text-lg font-serif font-bold text-amber-600">
                {tasksByPriority.medium.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-stone-700">Low Priority</span>
              </div>
              <span className="text-lg font-serif font-bold text-green-600">
                {tasksByPriority.low.length}
              </span>
            </div>
          </div>
        </div>

        {/* Sleep Quality */}
        {sleepStats.total > 0 && (
          <div className="card">
            <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">
              Sleep Quality Distribution
            </h3>
            <div className="space-y-2">
              {Object.entries(sleepStats.qualityDistribution).reverse().map(([quality, count]) => {
                const percentage = sleepStats.total > 0 ? (count / sleepStats.total) * 100 : 0;
                const emojis = ['😫', '😕', '😊', '😄', '🤩'];
                return (
                  <div key={quality}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-stone-700">
                        {emojis[parseInt(quality) - 1]} {quality}/5
                      </span>
                      <span className="text-sm font-semibold text-purple-600">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Focus Sessions */}
        <div className="card">
          <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">
            Focus Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">Total Sessions</span>
              <span className="text-lg font-serif font-bold text-indigo-600">
                {focusStats.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">Total Time</span>
              <span className="text-lg font-serif font-bold text-indigo-600">
                {formatDuration(focusStats.totalMinutes)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">Average Session</span>
              <span className="text-lg font-serif font-bold text-indigo-600">
                {formatDuration(focusStats.averageSession)}
              </span>
            </div>
          </div>
        </div>

        {/* Expense Summary */}
        <div className="card">
          <h3 className="text-lg font-serif font-semibold text-stone-900 mb-4">
            Spending Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">This Month</span>
              <span className="text-lg font-serif font-bold text-amber-600">
                {formatCurrency(expenseStats.monthTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">Total Expenses</span>
              <span className="text-lg font-serif font-bold text-amber-600">
                {expenseStats.total}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">Average</span>
              <span className="text-lg font-serif font-bold text-amber-600">
                {formatCurrency(expenseStats.averageExpense)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {progress.badges.length > 0 && (
        <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg border border-yellow-200">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-stone-900">
              Achievements Unlocked
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {progress.badges.map((badge) => (
              <div
                key={badge}
                className="px-4 py-2 bg-white border-2 border-yellow-300 rounded-full text-sm font-medium text-yellow-800 shadow-sm"
              >
                🏆 {badge}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Goals */}
      <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg border border-green-200">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-serif font-semibold text-stone-900">
            Keep Building Momentum
          </h2>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <p className="text-sm text-stone-700 mb-2">
              <strong>Consistency is key:</strong> You've logged data for {progress.currentStreak} consecutive days.
            </p>
            <p className="text-xs text-stone-500">
              Keep tracking to unlock deeper insights and patterns.
            </p>
          </div>
          
          {taskStats.active > 0 && (
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <p className="text-sm text-stone-700 mb-2">
                <strong>Complete your tasks:</strong> You have {taskStats.active} active tasks waiting.
              </p>
              <p className="text-xs text-stone-500">
                Finishing tasks earns XP and builds your streak.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}