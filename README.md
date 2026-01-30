# 🚀 Life OS - Your Personal Operating System

A beautiful, calm productivity app that tracks what matters: tasks, focus, sleep, and expenses. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Life OS](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

### 📋 Task Management
- Create, edit, and delete tasks
- 3 priority levels (High/Medium/Low)
- Earn XP on completion (15/30/50 based on priority)
- Group tasks by priority
- Track completion rates

### ⏱️ Deep Work Timer
- Fullscreen distraction-free timer
- 3 modes: 25min (Pomodoro), 50min (Deep work), Custom
- Audio notification on completion
- Session history tracking
- Average session statistics

### 😴 Sleep Tracking
- Manual sleep/wake time input
- 5-level quality rating (with emojis!)
- Auto-calculates duration (handles overnight sleep)
- Consistency scoring (last 7 days)
- Quality distribution analysis

### 💰 Expense Tracking
- 6 categories with emojis (Food, Transport, Subscriptions, Fun, Learning, Misc)
- Monthly spending view
- Category breakdown with progress bars
- Optional notes per expense

### 📊 Insights & Analytics
- Monthly report generation
- AI-powered pattern detection
- Sleep quality distribution
- Focus productivity metrics
- Spending analysis
- Achievement badges

### 🎮 Gamification
- XP system with leveling
- Daily streak tracking
- 7 achievement badges
- Progress visualization
- Activity calendar (GitHub-style)

## 🎨 Design Philosophy

**Calm Productivity** - Inspired by Ali Abdaal × Linear × GitHub
- Warm neutral color palette (Stone)
- Custom typography (Crimson Pro serif + DM Sans sans-serif)
- Generous whitespace
- Smooth animations
- No visual noise or guilt-driven UX

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📱 Pages

- `/` - Dashboard with overview stats and activity calendar
- `/tasks` - Task management with priority grouping
- `/focus` - Deep work timer and session history
- `/sleep` - Sleep tracking and quality analysis
- `/expenses` - Expense tracking with category breakdown
- `/insights` - Monthly report and AI insights
- `/settings` - Progress stats and reset option

## 🗂️ Project Structure

```
my-app/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── dashboard/         # Calendar, stats, badges
│   ├── tasks/             # Task CRUD components
│   ├── focus/             # Timer and session history
│   ├── sleep/             # Sleep form and list
│   ├── expenses/          # Expense form and list
│   └── layout/            # Sidebar and header
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
│   ├── types.ts           # TypeScript definitions
│   ├── storage.ts         # LocalStorage wrappers
│   ├── xp-system.ts       # Leveling calculations
│   └── utils.ts           # Helper functions
└── context/               # React Context providers
```

## 💾 Data Storage

All data is stored locally in browser localStorage:
- **Tasks** - `lifeos_tasks`
- **Focus Sessions** - `lifeos_focus`
- **Sleep Entries** - `lifeos_sleep`
- **Expenses** - `lifeos_expenses`
- **User Progress** - `lifeos_progress` (XP, level, streak, badges)
- **Day Data** - `lifeos_day_data` (for calendar visualization)

**Note:** Data persists across sessions but is device-specific. Export/import feature coming soon!

## 🎯 XP System

- **High Priority Task:** +50 XP
- **Medium Priority Task:** +30 XP
- **Low Priority Task:** +15 XP

**Level Formula:** `Level = floor(sqrt(XP / 100))`

**Badges:**
- Level 1: First Steps
- Level 5: Getting Started
- Level 10: Momentum Builder
- Level 25: Consistency
- Level 50: Dedication
- Level 75: Mastery
- Level 100: Legend

## 🔥 Streak System

- Complete at least 1 task per day to maintain streak
- Streak resets if you miss a day
- Displays in header with flame icon
- Tracks longest streak ever

## 📅 Activity Calendar

GitHub-style monthly heatmap showing:
- Green intensity based on XP earned
- 5 levels: 0 (no activity) to 4 (200+ XP)
- Hover tooltips with detailed stats
- Month navigation

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Storage:** LocalStorage
- **State:** React Context + Custom Hooks

## 🎨 Color Palette

- **Base:** Stone (warm neutral)
- **Accent:** Indigo (XP/levels)
- **Streak:** Orange (fire)
- **Priorities:** Red (high), Amber (medium), Green (low)
- **Features:** Purple (sleep), Blue (focus), Amber (expenses)

## 📝 Best Practices

1. **Log sleep daily** - Track consistency improves insights
2. **Set realistic tasks** - Break large tasks into smaller ones
3. **Use priorities** - Focus on high-priority items first
4. **Deep work sessions** - 50min sessions build deep work capacity
5. **Track expenses** - Awareness is the first step to better spending

## 🚧 Roadmap

- [ ] Data export/import
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Cloud sync
- [ ] Habit tracking
- [ ] Goal setting
- [ ] Weekly review
- [ ] Custom themes

## 📄 License

MIT License - feel free to use for personal projects!

## 🙏 Acknowledgments

Design inspired by:
- Ali Abdaal's productivity philosophy
- Linear's clean interface
- GitHub's contribution graph
- Notion's calm aesthetic

---

**Built with ❤️ and TypeScript**

Made to be used daily for the next 10 years. Not just another productivity app - this is your Life OS.
