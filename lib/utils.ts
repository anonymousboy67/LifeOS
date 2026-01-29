// lib/utils.ts

// Simple className merger (no external deps needed)
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Date utilities
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function isToday(date: string): boolean {
  return date === getToday();
}

export function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

export function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Time formatting
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

// Calculate sleep duration
export function calculateSleepDuration(sleepTime: string, wakeTime: string): number {
  const sleep = new Date(`1970-01-01T${sleepTime}`);
  let wake = new Date(`1970-01-01T${wakeTime}`);
  
  // If wake time is before sleep time, it's next day
  if (wake < sleep) {
    wake = new Date(wake.getTime() + 24 * 60 * 60 * 1000);
  }
  
  const diff = wake.getTime() - sleep.getTime();
  return Number((diff / (1000 * 60 * 60)).toFixed(1)); // hours
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}