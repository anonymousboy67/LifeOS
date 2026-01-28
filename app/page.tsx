'use client';

import { useState, useEffect } from 'react';

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

export default function Home() {
  const [data, setData] = useState<any>(null);
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
      const res = await fetch('/api/habits');
      const loaded = await res.json();
      setData(loaded);
    } catch {
      // Initialize if not exists
      const initial = { dailyHabits: {}, streak: 0, totalXP: 0, earnedBadges: [] };
      for (let i = 0; i < totalDays; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        initial.dailyHabits[d.toISOString().split('T')[0]] = new Array(30).fill(false);
      }
      setData(initial);
      await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initial)
      });
    }
    setLoading(false);
  };

  const toggleHabit = async (idx: number) => {
    if (!data) return;
    const key = getTodayKey();
    const newData = { ...data };
    newData.dailyHabits[key][idx] = !newData.dailyHabits[key][idx];
    newData.totalXP += newData.dailyHabits[key][idx] ? 10 : -10;

    // Update streak
    let streak = 0;
    const dayIdx = getDayIndex();
    for (let i = dayIdx; i >= 0; i--) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const k = d.toISOString().split('T')[0];
      if (newData.dailyHabits[k]?.filter(Boolean).length === 30) streak++;
      else break;
    }
    newData.streak = streak;

    setData(newData);
    await fetch('/api/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });

    if (newData.dailyHabits[key].filter(Boolean).length === 30) {
      setShowCelebration(true);
    }
  };

  if (loading || !data) return <div className="container">Loading...</div>;

  const todayKey = getTodayKey();
  const todayHabits = data.dailyHabits[todayKey] || [];
  const completed = todayHabits.filter(Boolean).length;
  const progress = (completed / 30) * 100;
  const level = data.totalXP >= 3000 ? 'Unstoppable' : data.totalXP >= 1500 ? 'Disciplined' : 'Beginner';

  return (
    <div className="container">
      <div className="hero">
        <h1>Your Transformation Journey</h1>
        <div className="current-day">Day {getDayIndex() + 1} of 30</div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Streak</div>
            <div className="stat-value">🔥 {data.streak}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">XP</div>
            <div className="stat-value">{data.totalXP}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Completion</div>
            <div className="stat-value">{Math.round(progress)}%</div>
          </div>
        </div>
        <div className="level-badge">{level}</div>
      </div>

      <div className="progress-section">
        <div className="progress-label">
          <span>Today's Progress</span>
          <span>{completed}/30</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="habits-section">
        <h2 className="section-title">Today's Habits</h2>
        <div className="habits-list">
          {habits.map((habit, idx) => (
            <div
              key={idx}
              className={`habit-item ${todayHabits[idx] ? 'completed' : ''}`}
              onClick={() => toggleHabit(idx)}
            >
              <div className="checkbox">
                <span className="checkmark">✓</span>
              </div>
              <div className="habit-text">{habit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="badges-section">
        <h2 className="section-title">Achievement Badges</h2>
        <div className="badges-grid">
          {badges.map(b => (
            <div key={b.id} className={`badge ${data.streak >= b.req ? 'earned' : ''}`}>
              <div className="badge-icon">{b.icon}</div>
              <div className="badge-name">{b.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="reflection">
        "{reflections[Math.floor(Math.random() * reflections.length)]}"
      </div>

      {showCelebration && (
        <div className="celebration-modal show">
          <div className="celebration-content">
            <div className="celebration-emoji">🎉</div>
            <h2 className="celebration-title">Incredible!</h2>
            <p className="celebration-message">You completed all 30 habits today!</p>
            <button className="close-celebration" onClick={() => setShowCelebration(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}