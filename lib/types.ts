export interface Task{
    id: number;
    text: string;
    done:boolean;
    createdAt:string;
}

export interface TasksByPriority{
    critical: Task[];
    medium: Task[];
    low: Task[];
}

export type Priority = 'critical' | 'medium' | 'low';

export interface Habit{
    id:number;
    name:string;
    icon:string;
    completed:boolean;
    streak:number;
}

export interface User{
    name:string;
    level:number;
    xp:number;
    xpToNext:number;
    streak:number;
    totalFocusHours:number;
}

export interface FocusSession{
    duration:number; // in minutes
    isRunning:boolean;
    todaySessions:number;
}

export type ViewType = 'today'| 'focus'| 'tasks' | 'analytics';
