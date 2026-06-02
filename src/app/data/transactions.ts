export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Alimentação'
  | 'Lazer'
  | 'Contas'
  | 'Saúde'
  | 'Transporte'
  | 'Moradia'
  | 'Educação'
  | 'Outros'
  | 'Salário'
  | 'Renda Extra';

export const EXPENSE_CATEGORIES: Category[] = [
  'Alimentação',
  'Lazer',
  'Contas',
  'Saúde',
  'Transporte',
  'Moradia',
  'Educação',
  'Outros',
];

export const INCOME_CATEGORIES: Category[] = ['Salário', 'Renda Extra'];

export const ALL_CATEGORIES: Category[] = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string; // Data no formato ISO
  notes?: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Alimentação: 'var(--color-cat-food)',
  Lazer: 'var(--color-cat-leisure)',
  Contas: 'var(--color-cat-bills)',
  Saúde: 'var(--color-cat-health)',
  Transporte: 'var(--color-cat-transport)',
  Moradia: 'var(--color-cat-housing)',
  Educação: 'var(--color-cat-education)',
  Outros: 'var(--color-cat-other)',
  Salário: 'var(--color-cat-salary)',
  'Renda Extra': 'var(--color-cat-extra)',
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'income', amount: 3600, category: 'Salário', description: 'Salário de abril', date: '2026-04-05' },
  { id: '2', type: 'expense', amount: 950, category: 'Moradia', description: 'Aluguel residencial', date: '2026-04-06' },
  { id: '3', type: 'expense', amount: 138, category: 'Contas', description: 'Conta de energia', date: '2026-04-08' },
  { id: '4', type: 'expense', amount: 420, category: 'Alimentação', description: 'Compras de mercado', date: '2026-04-10' },
  { id: '5', type: 'expense', amount: 180, category: 'Transporte', description: 'Combustível e transporte', date: '2026-04-12' },
  { id: '6', type: 'income', amount: 350, category: 'Renda Extra', description: 'Serviço freelancer', date: '2026-04-15' },
  { id: '7', type: 'expense', amount: 95, category: 'Lazer', description: 'Cinema e lanche', date: '2026-04-18' },
  { id: '8', type: 'expense', amount: 72, category: 'Saúde', description: 'Farmácia', date: '2026-04-21' },
  { id: '9', type: 'expense', amount: 110, category: 'Educação', description: 'Material de estudo', date: '2026-04-24' },
  { id: '10', type: 'expense', amount: 84, category: 'Contas', description: 'Internet residencial', date: '2026-04-28' },
  { id: '11', type: 'income', amount: 3600, category: 'Salário', description: 'Salário de maio', date: '2026-05-05' },
  { id: '12', type: 'expense', amount: 950, category: 'Moradia', description: 'Aluguel residencial', date: '2026-05-06' },
  { id: '13', type: 'expense', amount: 126, category: 'Contas', description: 'Conta de água', date: '2026-05-08' },
  { id: '14', type: 'expense', amount: 455, category: 'Alimentação', description: 'Supermercado do mês', date: '2026-05-11' },
  { id: '15', type: 'expense', amount: 210, category: 'Transporte', description: 'Transporte por aplicativo', date: '2026-05-14' },
  { id: '16', type: 'income', amount: 480, category: 'Renda Extra', description: 'Venda de itens usados', date: '2026-05-17' },
  { id: '17', type: 'expense', amount: 160, category: 'Lazer', description: 'Passeio em família', date: '2026-05-19' },
  { id: '18', type: 'expense', amount: 64, category: 'Saúde', description: 'Medicamentos', date: '2026-05-22' },
  { id: '19', type: 'expense', amount: 130, category: 'Educação', description: 'Curso online', date: '2026-05-25' },
  { id: '20', type: 'expense', amount: 98, category: 'Outros', description: 'Compras diversas', date: '2026-05-29' },
];
