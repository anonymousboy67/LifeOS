// hooks/useTasks.ts
'use client';

import { useState, useEffect } from 'react';
import { Task, Priority } from '@/lib/types';
import { taskStorage, dayDataStorage } from '@/lib/storage';
import { generateId, getToday } from '@/lib/utils';
import { XP_VALUES } from '@/lib/xp-system';
import { useProgress } from '@/context/ProgressContext';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { addXP, updateStreak } = useProgress();

  // Load tasks from storage on mount
  useEffect(() => {
    const saved = taskStorage.get();
    setTasks(saved);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    taskStorage.set(tasks);
  }, [tasks]);

  const addTask = (title: string, priority: Priority = 'medium') => {
    const newTask: Task = {
      id: generateId(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const isCompleting = !task.completed;
          
          // If completing the task
          if (isCompleting) {
            // Award XP
            const xp = XP_VALUES[task.priority];
            addXP(xp);
            
            // Update streak
            updateStreak();
            
            // Update day data for calendar
            const today = getToday();
            dayDataStorage.updateDay(today, {
              tasksCompleted: 1,
              xpEarned: xp,
            });
          } else {
            // If uncompleting, subtract XP
            const xp = XP_VALUES[task.priority];
            addXP(-xp);
            
            // Update day data
            const today = getToday();
            dayDataStorage.updateDay(today, {
              tasksCompleted: -1,
              xpEarned: -xp,
            });
          }
          
          return {
            ...task,
            completed: isCompleting,
            completedAt: isCompleting ? new Date().toISOString() : undefined,
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, title: string, priority: Priority) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, priority } : task
      )
    );
  };

  // Get tasks by completion status
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  // Get tasks by priority
  const tasksByPriority = {
    high: tasks.filter((t) => t.priority === 'high' && !t.completed),
    medium: tasks.filter((t) => t.priority === 'medium' && !t.completed),
    low: tasks.filter((t) => t.priority === 'low' && !t.completed),
  };

  // Stats
  const stats = {
    total: tasks.length,
    active: activeTasks.length,
    completed: completedTasks.length,
    completionRate: tasks.length > 0 
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0,
  };

  return {
    tasks,
    activeTasks,
    completedTasks,
    tasksByPriority,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  };
}