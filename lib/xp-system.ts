// lib/xp-system.ts
import { Priority } from './types';

// XP values per priority
export const XP_VALUES: Record<Priority, number> = {
  high: 50,
  medium: 30,
  low: 15,
};

// Calculate level from total XP
// Formula: Level = floor(sqrt(XP / 100))
export function calculateLevel(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 100));
}

// Calculate XP needed for next level
export function xpForNextLevel(currentLevel: number): number {
  return (currentLevel + 1) ** 2 * 100;
}

// Calculate progress percentage to next level
export function levelProgress(totalXP: number, currentLevel: number): number {
  const currentLevelXP = currentLevel ** 2 * 100;
  const nextLevelXP = xpForNextLevel(currentLevel);
  const progressXP = totalXP - currentLevelXP;
  const neededXP = nextLevelXP - currentLevelXP;
  return Math.round((progressXP / neededXP) * 100);
}

// Badges unlock at specific levels
export const BADGE_UNLOCKS: Record<number, string> = {
  1: 'First Steps',
  5: 'Getting Started',
  10: 'Momentum Builder',
  25: 'Consistency',
  50: 'Dedication',
  75: 'Mastery',
  100: 'Legend',
};

export function getUnlockedBadges(level: number): string[] {
  return Object.entries(BADGE_UNLOCKS)
    .filter(([lvl]) => level >= Number(lvl))
    .map(([, badge]) => badge);
}