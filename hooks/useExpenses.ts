// hooks/useExpenses.ts
'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseCategory } from '@/lib/types';
import { expenseStorage, dayDataStorage } from '@/lib/storage';
import { generateId, getToday } from '@/lib/utils';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from storage on mount
  useEffect(() => {
    const saved = expenseStorage.get();
    setExpenses(saved);
  }, []);

  // Save expenses whenever they change
  useEffect(() => {
    expenseStorage.set(expenses);
  }, [expenses]);

  const addExpense = (amount: number, category: ExpenseCategory, note?: string, date?: string) => {
    const expenseDate = date || getToday();

    const newExpense: Expense = {
      id: generateId(),
      amount,
      category,
      date: expenseDate,
      note,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    // Update day data
    dayDataStorage.updateDay(expenseDate, {
      moneySpent: amount,
    });

    return newExpense;
  };

  const deleteExpense = (id: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (expense) {
      // Subtract from day data
      dayDataStorage.updateDay(expense.date, {
        moneySpent: -expense.amount,
      });
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = (id: string, amount: number, category: ExpenseCategory, note?: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;

    // Calculate difference for day data
    const diff = amount - expense.amount;

    setExpenses((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, amount, category, note }
          : e
      )
    );

    // Update day data with difference
    dayDataStorage.updateDay(expense.date, {
      moneySpent: diff,
    });
  };

  // Get expenses for current month
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const monthExpenses = expenses.filter((e) => e.date.startsWith(currentMonth));
  const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Get expenses by category
  const byCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  // Today's expenses
  const todayExpenses = expenses.filter((e) => e.date === getToday());
  const todayTotal = todayExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Stats
  const stats = {
    total: expenses.length,
    totalAmount: expenses.reduce((sum, e) => sum + e.amount, 0),
    monthTotal,
    todayTotal,
    byCategory,
    averageExpense: expenses.length > 0
      ? expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length
      : 0,
  };

  return {
    expenses,
    monthExpenses,
    todayExpenses,
    stats,
    addExpense,
    deleteExpense,
    updateExpense,
  };
}