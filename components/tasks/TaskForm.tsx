// components/tasks/TaskForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { Priority } from '@/lib/types';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  onSubmit: (title: string, priority: Priority) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialPriority?: Priority;
  submitText?: string;
}

export default function TaskForm({
  onSubmit,
  onCancel,
  initialTitle = '',
  initialPriority = 'medium',
  submitText = 'Add Task',
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [priority, setPriority] = useState<Priority>(initialPriority);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), priority);
      setTitle('');
      setPriority('medium');
    }
  };

  const priorities: { value: Priority; label: string; color: string }[] = [
    { value: 'high', label: 'High', color: 'badge-high' },
    { value: 'medium', label: 'Medium', color: 'badge-medium' },
    { value: 'low', label: 'Low', color: 'badge-low' },
  ];

  return (
    <form onSubmit={handleSubmit} className="card bg-stone-50">
      <div className="space-y-4">
        {/* Task Title Input */}
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-stone-700 mb-2">
            Task
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="input"
            autoFocus
          />
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Priority
          </label>
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={cn(
                  'badge transition-all duration-200',
                  priority === p.value
                    ? p.color
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={!title.trim()}
            className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>{submitText}</span>
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}