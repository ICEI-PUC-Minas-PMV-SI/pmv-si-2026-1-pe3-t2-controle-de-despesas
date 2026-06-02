import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Transaction, Category, TransactionType } from '~/data/transactions';
import { INITIAL_TRANSACTIONS } from '~/data/transactions';
import type { User } from '~/data/user';
import { INITIAL_USER } from '~/data/user';

let transactionIdCounter = INITIAL_TRANSACTIONS.length + 1;

const TRANSACTIONS_STORAGE_KEY = 'cdd-transactions';
const USER_STORAGE_KEY = 'cdd-user';
const DATA_VERSION_STORAGE_KEY = 'cdd-data-version';
const CURRENT_DATA_VERSION = '2026-04-05-examples';

function generateId(): string {
  return String(transactionIdCounter++);
}

function parseStoredAmount(value: unknown): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value !== 'string') return 0;

  const normalized = value
    .trim()
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeTransaction(item: Transaction): Transaction {
  return {
    ...item,
    amount: parseStoredAmount(item.amount),
  };
}

function loadTransactions(): Transaction[] {
  if (typeof window === 'undefined') return INITIAL_TRANSACTIONS;

  const version = window.localStorage.getItem(DATA_VERSION_STORAGE_KEY);
  if (version !== CURRENT_DATA_VERSION) {
    window.localStorage.setItem(DATA_VERSION_STORAGE_KEY, CURRENT_DATA_VERSION);
    window.localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
    return INITIAL_TRANSACTIONS;
  }

  const saved = window.localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
  if (!saved) return INITIAL_TRANSACTIONS;

  try {
    const parsed = JSON.parse(saved) as Transaction[];
    if (!Array.isArray(parsed)) return INITIAL_TRANSACTIONS;
    const normalizedTransactions = parsed.map(normalizeTransaction);

    const highestId = normalizedTransactions.reduce((max, item) => {
      const numericId = Number(item.id);
      return Number.isFinite(numericId) && numericId > max ? numericId : max;
    }, INITIAL_TRANSACTIONS.length);
    transactionIdCounter = highestId + 1;

    return normalizedTransactions;
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

function loadUser(): User {
  if (typeof window === 'undefined') return INITIAL_USER;

  const saved = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!saved) return INITIAL_USER;

  try {
    return { ...INITIAL_USER, ...JSON.parse(saved) };
  } catch {
    return INITIAL_USER;
  }
}

export interface TransactionInput {
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
  notes?: string;
}

export function useFinanceStore() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [user, setUser] = useState<User>(loadUser);

  useEffect(() => {
    window.localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const addTransaction = useCallback((input: TransactionInput) => {
    const newTx: Transaction = { id: generateId(), ...input, amount: parseStoredAmount(input.amount) };
    setTransactions((prev) => [newTx, ...prev]);
  }, []);

  const updateTransaction = useCallback((id: string, input: TransactionInput) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, ...input, amount: parseStoredAmount(input.amount) } : tx)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  const totals = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [transactions]);

  const currentMonthTotals = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthTx = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    // Se o mês atual estiver vazio, usa todos os lançamentos de exemplo.
    const source = monthTx.length > 0 ? monthTx : transactions;
    const income = source.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = source.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses };
  }, [transactions]);

  return {
    transactions,
    user,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateUser,
    totals,
    currentMonthTotals,
  };
}

export type FinanceStore = ReturnType<typeof useFinanceStore>;
