// app/tasks/page.tsx
'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';
import TaskStats from '@/components/tasks/TaskStats';
import { ListTodo, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'active' | 'completed';

export default function TasksPage() {
  const {
    activeTasks,
    completedTasks,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  } = useTasks();

  const [viewMode, setViewMode] = useState<ViewMode>('active');
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (title: string, priority: any) => {
    addTask(title, priority);
    setShowForm(false);
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          Tasks
        </h1>
        <p className="text-stone-600">
          Manage your priorities and earn XP
        </p>
      </div>

      {/* Stats */}
      <TaskStats
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
        completionRate={stats.completionRate}
      />

      {/* Add Task Section */}
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary w-full sm:w-auto"
          >
            <ListTodo className="w-4 h-4" />
            <span>Add New Task</span>
          </button>
        ) : (
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2 border-b border-stone-200">
        <button
          onClick={() => setViewMode('active')}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2',
            viewMode === 'active'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-700'
          )}
        >
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4" />
            <span>Active</span>
            <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-full text-xs">
              {stats.active}
            </span>
          </div>
        </button>

        <button
          onClick={() => setViewMode('completed')}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2',
            viewMode === 'completed'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-700'
          )}
        >
          <div className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4" />
            <span>Completed</span>
            <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-full text-xs">
              {stats.completed}
            </span>
          </div>
        </button>
      </div>

      {/* Task List */}
      <TaskList
        tasks={viewMode === 'active' ? activeTasks : completedTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onUpdate={updateTask}
        showCompleted={viewMode === 'completed'}
      />
    </div>
  );
}