import { useState, useMemo } from 'react';
import type { Transaction, Category } from '~/data/transactions';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '~/data/transactions';

export interface FilterState {
  dateFrom: string;
  dateTo: string;
  expenseCategory: Category | '';
  incomeCategory: Category | '';
}

const EMPTY_FILTER: FilterState = {
  dateFrom: '',
  dateTo: '',
  expenseCategory: '',
  incomeCategory: '',
};

export interface FilterError {
  dateFrom?: string;
  dateTo?: string;
}

function applyFilters(transactions: Transaction[], filters: FilterState): Transaction[] {
  return transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      if (txDate < from) return false;
    }
    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      if (txDate > to) return false;
    }
    if (filters.expenseCategory && tx.type === 'expense' && tx.category !== filters.expenseCategory) return false;
    if (filters.incomeCategory && tx.type === 'income' && tx.category !== filters.incomeCategory) return false;
    return true;
  });
}

export function useDashboardFilters(transactions: Transaction[]) {
  const [draft, setDraft] = useState<FilterState>(EMPTY_FILTER);
  const [applied, setApplied] = useState<FilterState>(EMPTY_FILTER);
  const [errors, setErrors] = useState<FilterError>({});
  const [filtersApplied, setFiltersApplied] = useState(false);

  function validate(): FilterError {
    const errs: FilterError = {};
    if (draft.dateFrom && draft.dateTo) {
      if (new Date(draft.dateFrom) > new Date(draft.dateTo)) {
        errs.dateTo = 'A data final deve ser posterior à data inicial.';
      }
    }
    if (draft.dateTo && !draft.dateFrom) {
      errs.dateFrom = 'Informe a data inicial.';
    }
    return errs;
  }

  function handleApply() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApplied({ ...draft });
    setFiltersApplied(true);
  }

  function handleClear() {
    setDraft(EMPTY_FILTER);
    setApplied(EMPTY_FILTER);
    setErrors({});
    setFiltersApplied(false);
  }

  function setField<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FilterError]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  const filtered = useMemo(() => applyFilters(transactions, applied), [transactions, applied]);

  const totals = useMemo(() => {
    const income = filtered.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = filtered.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [filtered]);

  const barData = useMemo(() => {
    const monthMap = new Map<string, { receitas: number; despesas: number }>();
    filtered.forEach((tx) => {
      const d = new Date(tx.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
      if (!monthMap.has(key)) monthMap.set(key, { receitas: 0, despesas: 0 });
      const entry = monthMap.get(key)!;
      if (tx.type === 'income') entry.receitas += tx.amount;
      else entry.despesas += tx.amount;
    });
    return Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        mes: new Date(key + '-01').toLocaleString('pt-BR', { month: 'short', year: '2-digit' }),
        receitas: val.receitas,
        despesas: val.despesas,
      }));
  }, [filtered]);

  const donutData = useMemo(() => {
    const map = new Map<string, number>();
    filtered
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
      });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  return {
    draft,
    errors,
    filtersApplied,
    filtered,
    totals,
    barData,
    donutData,
    setField,
    handleApply,
    handleClear,
    expenseCategories: EXPENSE_CATEGORIES,
    incomeCategories: INCOME_CATEGORIES,
  };
}
