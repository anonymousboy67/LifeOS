// components/tasks/TaskList.tsx
'use client';

import { Task, Priority } from '@/lib/types';
import TaskItem from './TaskItem';
import { CheckCircle2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, priority: Priority) => void;
  showCompleted?: boolean;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
  showCompleted = false,
}: TaskListProps) {
  const filteredTasks = showCompleted
    ? tasks.filter((t) => t.completed)
    : tasks.filter((t) => !t.completed);

  // Group by priority
  const highPriority = filteredTasks.filter((t) => t.priority === 'high');
  const mediumPriority = filteredTasks.filter((t) => t.priority === 'medium');
  const lowPriority = filteredTasks.filter((t) => t.priority === 'low');

  if (filteredTasks.length === 0) {
    return (
      <div className="card bg-stone-50 text-center py-12">
        <CheckCircle2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
        <p className="text-stone-500">
          {showCompleted ? 'No completed tasks yet' : 'No active tasks'}
        </p>
        <p className="text-sm text-stone-400 mt-1">
          {showCompleted ? 'Complete some tasks to see them here' : 'Add a task to get started'}
        </p>
      </div>
    );
  }

  const renderPrioritySection = (
    title: string,
    tasks: Task[],
    color: string
  ) => {
    if (tasks.length === 0) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
            {title}
          </h3>
          <span className="text-xs text-stone-500">({tasks.length})</span>
        </div>
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </div>
    );
  };

  if (showCompleted) {
    // For completed tasks, show all in one list
    return (
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    );
  }

  // For active tasks, group by priority
  return (
    <div className="space-y-6">
      {renderPrioritySection('High Priority', highPriority, 'bg-red-500')}
      {renderPrioritySection('Medium Priority', mediumPriority, 'bg-amber-500')}
      {renderPrioritySection('Low Priority', lowPriority, 'bg-green-500')}
    </div>
  );
}