import { createContext, useContext } from 'react';
import type { FinanceStore } from './use-finance-store';

export const AppContext = createContext<FinanceStore | null>(null);

export function useAppContext(): FinanceStore {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
