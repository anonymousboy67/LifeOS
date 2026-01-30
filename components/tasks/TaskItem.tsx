// components/tasks/TaskItem.tsx
'use client';

import { useState } from 'react';
import { Task, Priority } from '@/lib/types';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { XP_VALUES } from '@/lib/xp-system';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, priority: Priority) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, editTitle.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const priorities: { value: Priority; label: string; color: string }[] = [
    { value: 'high', label: 'High', color: 'badge-high' },
    { value: 'medium', label: 'Medium', color: 'badge-medium' },
    { value: 'low', label: 'Low', color: 'badge-low' },
  ];

  const priorityColor = priorities.find((p) => p.value === task.priority)?.color || '';

  if (isEditing) {
    return (
      <div className="card bg-stone-50 animate-in">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input"
            autoFocus
          />
          
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setEditPriority(p.value)}
                className={cn(
                  'badge transition-all duration-200',
                  editPriority === p.value
                    ? p.color
                    : 'bg-white text-stone-600 border-stone-200'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-primary flex-1">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button onClick={handleCancel} className="btn btn-ghost">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'card group hover:shadow-md transition-all duration-200',
        task.completed && 'bg-stone-50'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-stone-300 hover:border-stone-400'
          )}
        >
          {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p
                className={cn(
                  'text-stone-900 font-medium',
                  task.completed && 'line-through text-stone-500'
                )}
              >
                {task.title}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className={cn('badge text-xs', priorityColor)}>
                  {task.priority}
                </span>
                
                <span className="text-xs text-stone-500">
                  +{XP_VALUES[task.priority]} XP
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {!task.completed && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                  title="Edit task"
                >
                  <Edit2 className="w-4 h-4 text-stone-600" />
                </button>
              )}
              
              <button
                onClick={() => {
                  if (confirm('Delete this task?')) {
                    onDelete(task.id);
                  }
                }}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}