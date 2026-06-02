import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useAppContext } from '~/hooks/use-app-context';
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '~/data/transactions';
import type { Route } from './+types/reports';
import styles from './reports.module.css';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Relatórios – CDD' }];
}

const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export default function Reports() {
  const { transactions } = useAppContext();
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear];
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  // Receitas e despesas por mês.
  const monthlyData = useMemo(() => {
    return MONTH_NAMES.map((month, i) => {
      const monthTx = transactions.filter((t) => {
        const d = new Date(t.date);
        return d.getFullYear() === selectedYear && d.getMonth() === i;
      });
      const income = monthTx.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const expenses = monthTx.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
      return { month, income, expenses };
    });
  }, [transactions, selectedYear]);

  // Total por categoria no ano escolhido.
  const categoryData = useMemo(() => {
    const catMap = new Map<string, number>();
    transactions
      .filter((t) => {
        const d = new Date(t.date);
        return t.type === 'expense' && d.getFullYear() === selectedYear;
      })
      .forEach((t) => {
        catMap.set(t.category, (catMap.get(t.category) ?? 0) + t.amount);
      });
    return Array.from(catMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, selectedYear]);

  const yearTotal = useMemo(() => {
    const inc = transactions
      .filter((t) => t.type === 'income' && new Date(t.date).getFullYear() === selectedYear)
      .reduce((s, t) => s + t.amount, 0);
    const exp = transactions
      .filter((t) => t.type === 'expense' && new Date(t.date).getFullYear() === selectedYear)
      .reduce((s, t) => s + t.amount, 0);
    return { inc, exp, balance: inc - exp };
  }, [transactions, selectedYear]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Relatórios Financeiros</h1>
          <p className={styles.pageSubtitle}>Acompanhe a evolução das suas finanças</p>
        </div>
        <div className={styles.periodSelector}>
          {years.map((y) => (
            <button
              key={y}
              className={[styles.yearBtn, selectedYear === y ? styles.yearBtnActive : ''].join(' ')}
              onClick={() => setSelectedYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Resumo do ano */}
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Total de receitas</p>
          <p className={[styles.summaryValue, styles.incomeVal].join(' ')}>{formatCurrency(yearTotal.inc)}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Total de despesas</p>
          <p className={[styles.summaryValue, styles.expenseVal].join(' ')}>{formatCurrency(yearTotal.exp)}</p>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Saldo final</p>
          <p className={[styles.summaryValue, yearTotal.balance >= 0 ? styles.incomeVal : styles.expenseVal].join(' ')}>
            {formatCurrency(yearTotal.balance)}
          </p>
        </div>
      </div>

      {/* Gráfico de linha com receitas e despesas */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Receitas e despesas — {selectedYear}</h2>
        <p className={styles.cardSubtitle}>Comparação mensal entre entradas e saídas</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} tickFormatter={(v) => `R$ ${v}`} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="var(--color-secondary)" strokeWidth={2.5} dot={false} name="Receitas" />
            <Line type="monotone" dataKey="expenses" stroke="var(--color-danger)" strokeWidth={2.5} dot={false} name="Despesas" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de barras por categoria */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Despesas por categoria — {selectedYear}</h2>
        <p className={styles.cardSubtitle}>Distribuição dos gastos no ano selecionado</p>
        {categoryData.length === 0 ? (
          <p className={styles.emptyState}>Nenhuma despesa encontrada para este período.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} tickFormatter={(v) => `R$ ${v}`} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="value" name="Valor gasto" radius={[6, 6, 0, 0]} fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Tabela de categorias */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Resumo por categoria</h2>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHead}>
              <th className={styles.th}>Categoria</th>
              <th className={[styles.th, styles.thRight].join(' ')}>Total gasto</th>
              <th className={[styles.th, styles.thRight].join(' ')}>% das despesas</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((row) => (
              <tr key={row.name} className={styles.tableRow}>
                <td className={styles.td}>
                  <div className={styles.catCell}>
                    <span
                      className={styles.catDot}
                      style={{ background: CATEGORY_COLORS[row.name as keyof typeof CATEGORY_COLORS] }}
                    />
                    {row.name}
                  </div>
                </td>
                <td className={[styles.td, styles.tdRight].join(' ')}>{formatCurrency(row.value)}</td>
                <td className={[styles.td, styles.tdRight].join(' ')}>
                  {yearTotal.exp > 0 ? ((row.value / yearTotal.exp) * 100).toFixed(1) : '0.0'}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
