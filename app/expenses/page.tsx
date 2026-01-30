// app/expenses/page.tsx
'use client';

import { useState } from 'react';
import { useExpenses } from '@/hooks/useExpenses';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import ExpenseList from '@/components/expenses/ExpenseList';
import { Wallet, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function ExpensesPage() {
  const { monthExpenses, stats, addExpense, deleteExpense } = useExpenses();
  const [showForm, setShowForm] = useState(false);

  const handleAddExpense = (amount: number, category: any, note?: string) => {
    addExpense(amount, category, note);
    setShowForm(false);
  };

  const statCards = [
    {
      label: 'This Month',
      value: formatCurrency(stats.monthTotal),
      icon: Wallet,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      subtitle: 'Total spending',
    },
    {
      label: 'Today',
      value: formatCurrency(stats.todayTotal),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      subtitle: 'Spent today',
    },
    {
      label: 'Average',
      value: formatCurrency(stats.averageExpense),
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      subtitle: 'Per expense',
    },
    {
      label: 'Total Expenses',
      value: stats.total,
      icon: PieChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      subtitle: 'All time',
    },
  ];

  // Category breakdown
  const categoryBreakdown = Object.entries(stats.byCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: stats.totalAmount > 0 ? (amount / stats.totalAmount) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const categoryEmojis = {
    food: '🍕',
    transport: '🚗',
    subscriptions: '📱',
    fun: '🎉',
    learning: '📚',
    misc: '💼',
  };

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          Expenses
        </h1>
        <p className="text-stone-600">
          Track your spending awareness
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`card ${stat.bgColor} ${stat.borderColor} border-2`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-stone-600">{stat.label}</p>
                  <p className={`text-2xl font-serif font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  {stat.subtitle && (
                    <p className="text-xs text-stone-500 mt-0.5">{stat.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Breakdown */}
      {categoryBreakdown.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-serif font-semibold text-stone-900 mb-4">
            Spending by Category
          </h2>
          <div className="space-y-3">
            {categoryBreakdown.map(({ category, amount, percentage }) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{categoryEmojis[category as keyof typeof categoryEmojis]}</span>
                    <span className="text-sm font-medium text-stone-700 capitalize">{category}</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-600">
                    {formatCurrency(amount)} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Expense Section */}
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <Wallet className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        ) : (
          <ExpenseForm
            onSubmit={handleAddExpense}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {/* Expense History */}
      <div>
        <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
          Expense History
        </h2>
        <ExpenseList expenses={monthExpenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
}