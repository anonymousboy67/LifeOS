// components/expenses/ExpenseList.tsx
'use client';

import { Expense } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Trash2, Wallet } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="card bg-stone-50 text-center py-12">
        <Wallet className="w-12 h-12 text-stone-300 mx-auto mb-3" />
        <p className="text-stone-500">No expenses yet</p>
        <p className="text-sm text-stone-400 mt-1">
          Add your first expense above
        </p>
      </div>
    );
  }

  const categoryEmojis = {
    food: '🍕',
    transport: '🚗',
    subscriptions: '📱',
    fun: '🎉',
    learning: '📚',
    misc: '💼',
  };

  const categoryLabels = {
    food: 'Food',
    transport: 'Transport',
    subscriptions: 'Subscriptions',
    fun: 'Fun',
    learning: 'Learning',
    misc: 'Misc',
  };

  // Group expenses by date
  const groupedExpenses = expenses.reduce((groups, expense) => {
    if (!groups[expense.date]) {
      groups[expense.date] = [];
    }
    groups[expense.date].push(expense);
    return groups;
  }, {} as Record<string, Expense[]>);

  const sortedDates = Object.keys(groupedExpenses).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => {
        const dateExpenses = groupedExpenses[date];
        const dateTotal = dateExpenses.reduce((sum, e) => sum + e.amount, 0);

        return (
          <div key={date} className="space-y-2">
            {/* Date Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">
                {formatDate(date)}
              </h3>
              <span className="text-sm font-semibold text-amber-600">
                {formatCurrency(dateTotal)}
              </span>
            </div>

            {/* Expenses */}
            <div className="space-y-2">
              {dateExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="card group hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-2xl">
                        {categoryEmojis[expense.category]}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-stone-900">
                            {categoryLabels[expense.category]}
                          </span>
                          <span className="text-lg font-serif font-bold text-amber-600">
                            {formatCurrency(expense.amount)}
                          </span>
                        </div>
                        {expense.note && (
                          <p className="text-xs text-stone-500 mt-0.5 truncate">
                            {expense.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Delete this expense?')) {
                          onDelete(expense.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}