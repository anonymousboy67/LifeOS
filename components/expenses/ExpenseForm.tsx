// components/expenses/ExpenseForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { ExpenseCategory } from '@/lib/types';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpenseFormProps {
  onSubmit: (amount: number, category: ExpenseCategory, note?: string) => void;
  onCancel?: () => void;
}

export default function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('misc');
  const [note, setNote] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onSubmit(numAmount, category, note || undefined);
      setAmount('');
      setNote('');
      setCategory('misc');
    }
  };

  const categories: { value: ExpenseCategory; label: string; emoji: string }[] = [
    { value: 'food', label: 'Food', emoji: '🍕' },
    { value: 'transport', label: 'Transport', emoji: '🚗' },
    { value: 'subscriptions', label: 'Subscriptions', emoji: '📱' },
    { value: 'fun', label: 'Fun', emoji: '🎉' },
    { value: 'learning', label: 'Learning', emoji: '📚' },
    { value: 'misc', label: 'Misc', emoji: '💼' },
  ];

  return (
    <form onSubmit={handleSubmit} className="card bg-amber-50 border-amber-200">
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-stone-700 mb-2">
            Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="input text-lg"
            autoFocus
            required
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={cn(
                  'p-3 rounded-lg border-2 transition-all duration-200 text-center',
                  category === cat.value
                    ? 'border-amber-400 bg-amber-100 shadow-sm'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                )}
              >
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <div className="text-xs font-medium text-stone-700">{cat.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Note (Optional) */}
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-stone-700 mb-2">
            Note (Optional)
          </label>
          <input
            id="note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What was this for?"
            className="input"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={!amount || parseFloat(amount) <= 0}
            className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}