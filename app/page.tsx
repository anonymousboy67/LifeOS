'use client';

import { useState, useEffect } from 'react';
import './globals.css';

const habits = [
  "Wake up 30 min earlier than usual", "Read 10 pages", "Use the 2-minute rule",
  "Plan the day the night before", 'Say "No" more often', "Track expenses",
  "Cut one digital habit per week", "Smile", "Use Pomodoro timer",
  "Write one sentence of gratitude", "Compliment one person", "No screen 30 min before sleep",
  "Stretch 2 min every hour", "Drink water immediately after waking", "Declutter one thing",
  "Stand up every hour", "Meditate 5 min", "Reflect on wins before sleep",
  "Write biggest goal daily", "Limit sugar", "Sleep at fixed time", "Make the bed",
  "Control environment & influences", "Mirror affirmations", "Celebrate progress",
  "Limit news intake", "Eat one extra vegetable", "Learn one new word",
  "Take 5 slow deep breaths when overwhelmed", "Set 3 micro-goals every morning"
];

const badges = [
  { id: 'first', name: 'First Step', icon: '🌱', req: 1 },
  { id: 'three', name: '3-Day Streak', icon: '🔥', req: 3 },
  { id: 'seven', name: 'Week Warrior', icon: '⚡', req: 7 },
  { id: 'fourteen', name: 'Fortnight', icon: '💪', req: 14 },
  { id: 'twentyone', name: 'Habit Former', icon: '🏆', req: 21 },
  { id: 'thirty', name: 'Unstoppable', icon: '👑', req: 30 }
];

const reflections = [
  "You showed up today. That's rare. Be proud.",
  "Small steps create massive change. You're proof.",
  "You're not just tracking habits. You're building identity.",
  "Future you is grateful for present you."
];

interface HabitData {
  dailyHabits: { [key: string]: boolean[] };
  streak: number;
  totalXP: number;
  earnedBadges: string[];
}

export default function Home() {
  const [data, setData] = useState<HabitData | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(true);

  const startDate = new Date(2026, 0, 23);
  const totalDays = 30;

  const getDayIndex = () => {
    const today = new Date();
    const diff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(diff, totalDays - 1));
  };

  const getTodayKey = () => {
    const idx = getDayIndex();
    const d = new Date(startDate);
    d.setDate(d.getDate() + idx);
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Try to load from localStorage
      const stored = localStorage.getItem('habitData');
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        // Initialize new data
        const initial: HabitData = { 
          dailyHabits: {}, 
          streak: 0, 
          totalXP: 0, 
          earnedBadges: [] 
        };
        for (let i = 0; i < totalDays; i++) {
          const d = new Date(startDate);
          d.setDate(d.getDate() + i);
          initial.dailyHabits[d.toISOString().split('T')[0]] = new Array(30).fill(false);
        }
        setData(initial);
        localStorage.setItem('habitData', JSON.stringify(initial));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Initialize with default data on error
      const initial: HabitData = { 
        dailyHabits: {}, 
        streak: 0, 
        totalXP: 0, 
        earnedBadges: [] 
      };
      for (let i = 0; i < totalDays; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        initial.dailyHabits[d.toISOString().split('T')[0]] = new Array(30).fill(false);
      }
      setData(initial);
    }
    setLoading(false);
  };

  const saveData = (newData: HabitData) => {
    try {
      localStorage.setItem('habitData', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const toggleHabit = (idx: number) => {
    if (!data) return;
    const key = getTodayKey();
    
    // Make sure the day exists in data
    if (!data.dailyHabits[key]) {
      data.dailyHabits[key] = new Array(30).fill(false);
    }

    const newData = { ...data };
    newData.dailyHabits = { ...data.dailyHabits };
    newData.dailyHabits[key] = [...data.dailyHabits[key]];
    
    // Toggle the habit
    newData.dailyHabits[key][idx] = !newData.dailyHabits[key][idx];
    
    // Update XP
    newData.totalXP += newData.dailyHabits[key][idx] ? 10 : -10;

    // Calculate streak
    let streak = 0;
    const dayIdx = getDayIndex();
    for (let i = dayIdx; i >= 0; i--) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const k = d.toISOString().split('T')[0];
      if (newData.dailyHabits[k]?.filter(Boolean).length === 30) {
        streak++;
      } else {
        break;
      }
    }
    newData.streak = streak;

    setData(newData);
    saveData(newData);

    // Check if all habits completed
    if (newData.dailyHabits[key].filter(Boolean).length === 30) {
      setShowCelebration(true);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-2xl">Loading your journey...</div>
      </div>
    );
  }

  const todayKey = getTodayKey();
  const todayHabits = data.dailyHabits[todayKey] || new Array(30).fill(false);
  const completed = todayHabits.filter(Boolean).length;
  const progress = (completed / 30) * 100;
  const level = data.totalXP >= 3000 ? 'Unstoppable' : data.totalXP >= 1500 ? 'Disciplined' : 'Beginner';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
            Your Transformation Journey
          </h1>
          <div className="text-xl md:text-2xl mb-6 text-purple-200">
            Day {getDayIndex() + 1} of 30
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <div className="text-sm text-purple-200 mb-1">Streak</div>
              <div className="text-2xl md:text-3xl font-bold">🔥 {data.streak}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <div className="text-sm text-purple-200 mb-1">XP</div>
              <div className="text-2xl md:text-3xl font-bold">{data.totalXP}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <div className="text-sm text-purple-200 mb-1">Completion</div>
              <div className="text-2xl md:text-3xl font-bold">{Math.round(progress)}%</div>
            </div>
          </div>

          {/* Level Badge */}
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-lg">
            {level}
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span>Today's Progress</span>
            <span className="font-bold">{completed}/30</span>
          </div>
          <div className="h-4 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Habits List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Today's Habits</h2>
          <div className="space-y-2">
            {habits.map((habit, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  todayHabits[idx]
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-white/10 hover:bg-white/20 border-2 border-transparent'
                }`}
                onClick={() => toggleHabit(idx)}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                  todayHabits[idx]
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/40'
                }`}>
                  {todayHabits[idx] && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
                <div className={`flex-1 ${todayHabits[idx] ? 'line-through opacity-60' : ''}`}>
                  {habit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`text-center p-4 rounded-xl border-2 transition-all ${
                  data.streak >= badge.req
                    ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400'
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-semibold">{badge.name}</div>
                <div className="text-xs text-purple-200 mt-1">{badge.req} days</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center italic text-lg">
          "{reflections[getDayIndex() % reflections.length]}"
        </div>

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 max-w-md w-full text-center transform animate-bounce-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-4">Incredible!</h2>
              <p className="text-lg mb-6">You completed all 30 habits today!</p>
              <button
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-100 transition-colors"
                onClick={() => setShowCelebration(false)}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}