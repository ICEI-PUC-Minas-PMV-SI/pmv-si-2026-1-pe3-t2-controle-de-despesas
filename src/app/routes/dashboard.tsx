import { useState } from 'react';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
  IconFilter,
  IconX,
  IconCheck,
  IconAlertCircle,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAppContext } from '~/hooks/use-app-context';
import { useDashboardFilters } from '~/hooks/use-dashboard-filters';
import { CATEGORY_COLORS } from '~/data/transactions';
import type { Route } from './+types/dashboard';
import styles from './dashboard.module.css';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Painel Financeiro – CDD' }];
}

const BRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateBR(value: string) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function getLocalDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function DateFilterPicker({
  id,
  value,
  min,
  max,
  hasError,
  onChange,
}: {
  id: string;
  value: string;
  min?: string;
  max?: string;
  hasError?: boolean;
  onChange: (value: string) => void;
}) {
  const initialDate = value ? getLocalDate(value) : new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const selectedIso = value;
  const todayIso = toIsoDate(new Date());

  function changeMonth(step: number) {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + step, 1));
  }

  function isDisabled(day: number) {
    const iso = toIsoDate(new Date(year, month, day));
    return Boolean((min && iso < min) || (max && iso > max));
  }

  function chooseDate(day: number) {
    if (isDisabled(day)) return;
    onChange(toIsoDate(new Date(year, month, day)));
    setIsOpen(false);
  }

  return (
    <div className={styles.datePicker}>
      <button
        id={id}
        type="button"
        className={[styles.filterInput, styles.dateButton, hasError ? styles.filterInputError : ''].join(' ')}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={value ? styles.dateButtonValue : styles.dateButtonPlaceholder}>
          {value ? formatDateBR(value) : 'dd/mm/aaaa'}
        </span>
        <IconCalendar size={16} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.calendarPanel} role="dialog" aria-label="Calendário em português">
          <div className={styles.calendarHeader}>
            <button type="button" className={styles.calendarNav} onClick={() => changeMonth(-1)} aria-label="Mês anterior">
              <IconChevronLeft size={16} />
            </button>
            <strong>
              {MONTH_NAMES[month]} {year}
            </strong>
            <button type="button" className={styles.calendarNav} onClick={() => changeMonth(1)} aria-label="Próximo mês">
              <IconChevronRight size={16} />
            </button>
          </div>

          <div className={styles.calendarGrid}>
            {WEEK_DAYS.map((day) => (
              <span key={day} className={styles.calendarWeekDay}>
                {day}
              </span>
            ))}
            {Array.from({ length: firstWeekDay }).map((_, index) => (
              <span key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const iso = toIsoDate(new Date(year, month, day));
              const disabled = isDisabled(day);
              return (
                <button
                  key={day}
                  type="button"
                  className={[
                    styles.calendarDay,
                    iso === selectedIso ? styles.calendarDaySelected : '',
                    iso === todayIso ? styles.calendarDayToday : '',
                  ].join(' ')}
                  onClick={() => chooseDate(day)}
                  disabled={disabled}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className={styles.calendarFooter}>
            <button type="button" onClick={() => onChange('')}>Limpar</button>
            <button
              type="button"
              onClick={() => {
                onChange(todayIso);
                setIsOpen(false);
              }}
            >
              Hoje
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className={styles.tooltipRow}>
          {p.name}: {BRL(p.value)}
        </p>
      ))}
    </div>
  );
};

interface DonutEntry { name: string; value: number; }

function DonutChart({ data, total }: { data: DonutEntry[]; total: number }) {
  return (
    <div className={styles.donutWrapper}>
      <div className={styles.donutChart}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={105}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS] ?? '#95A5A6'}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.donutCenter}>
          <span className={styles.donutCenterValue}>{BRL(total)}</span>
          <span className={styles.donutCenterLabel}>Total</span>
        </div>
      </div>
      <div className={styles.donutLegend}>
        {data.map((entry) => {
          const pct = total > 0 ? Math.round((entry.value / total) * 100) : 0;
          const color = CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS] ?? '#95A5A6';
          return (
            <div key={entry.name} className={styles.donutLegendRow}>
              <span className={styles.donutLegendDot} style={{ background: color }} />
              <span className={styles.donutLegendName}>{entry.name}</span>
              <span className={styles.donutLegendValue}>{BRL(entry.value)}</span>
              <span className={styles.donutLegendPct}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { transactions } = useAppContext();

  const {
    draft,
    errors,
    filtersApplied,
    totals,
    barData,
    donutData,
    setField,
    handleApply,
    handleClear,
    expenseCategories,
    incomeCategories,
  } = useDashboardFilters(transactions);

  return (
    <div className={styles.page}>
      {/* Cabeçalho da página */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Painel Financeiro</h1>
          <p className={styles.pageSubtitle}>Visão geral das suas finanças</p>
        </div>

      </div>

      {/* Cartões de resumo */}
      <div className={styles.summaryGrid}>
        <div className={[styles.summaryCard, styles.summaryBalance].join(' ')}>
          <div className={styles.summaryCardIcon}>
            <IconWallet size={22} />
          </div>
          <div>
            <p className={styles.summaryLabel}>Saldo Atual</p>
            <p className={[styles.summaryValue, totals.balance < 0 ? styles.expenseValue : ''].join(' ')}>
              {BRL(totals.balance)}
            </p>
          </div>
        </div>

        <div className={[styles.summaryCard, styles.summaryIncome].join(' ')}>
          <div className={[styles.summaryCardIcon, styles.incomeIcon].join(' ')}>
            <IconTrendingUp size={22} />
          </div>
          <div>
            <p className={styles.summaryLabel}>Total de Receitas</p>
            <p className={[styles.summaryValue, styles.incomeValue].join(' ')}>{BRL(totals.income)}</p>
          </div>
        </div>

        <div className={[styles.summaryCard, styles.summaryExpense].join(' ')}>
          <div className={[styles.summaryCardIcon, styles.expenseIcon].join(' ')}>
            <IconTrendingDown size={22} />
          </div>
          <div>
            <p className={styles.summaryLabel}>Total de Despesas</p>
            <p className={[styles.summaryValue, styles.expenseValue].join(' ')}>{BRL(totals.expenses)}</p>
          </div>
        </div>
      </div>

      {/* Painel de filtros */}
      <div className={styles.filterPanel}>
        <div className={styles.filterHeader}>
          <span className={styles.filterTitle}>
            <IconFilter size={16} />
            Filtros
          </span>
          {filtersApplied && (
            <span className={styles.filterActiveBadge}>
              <IconCheck size={12} /> Filtros aplicados
            </span>
          )}
        </div>

        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel} htmlFor="dateFrom">Data inicial</label>
            <DateFilterPicker
              id="dateFrom"
              value={draft.dateFrom}
              max={draft.dateTo || undefined}
              hasError={!!errors.dateFrom}
              onChange={(value) => setField('dateFrom', value)}
            />
            {errors.dateFrom && (
              <span className={styles.filterError}>
                <IconAlertCircle size={12} /> {errors.dateFrom}
              </span>
            )}
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel} htmlFor="dateTo">Data final</label>
            <DateFilterPicker
              id="dateTo"
              value={draft.dateTo}
              min={draft.dateFrom || undefined}
              hasError={!!errors.dateTo}
              onChange={(value) => setField('dateTo', value)}
            />
            {errors.dateTo && (
              <span className={styles.filterError}>
                <IconAlertCircle size={12} /> {errors.dateTo}
              </span>
            )}
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel} htmlFor="expCat">Categoria de despesa</label>
            <select
              id="expCat"
              className={styles.filterInput}
              value={draft.expenseCategory}
              onChange={(e) => setField('expenseCategory', e.target.value as any)}
            >
              <option value="">Todas as despesas</option>
              {expenseCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel} htmlFor="incCat">Categoria de receita</label>
            <select
              id="incCat"
              className={styles.filterInput}
              value={draft.incomeCategory}
              onChange={(e) => setField('incomeCategory', e.target.value as any)}
            >
              <option value="">Todas as receitas</option>
              {incomeCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.filterBtnApply} onClick={handleApply}>
              <IconCheck size={15} /> Aplicar
            </button>
            <button className={styles.filterBtnClear} onClick={handleClear}>
              <IconX size={15} /> Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className={styles.chartsGrid}>
        {/* Gráfico de barras: receitas e despesas */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Receitas × Despesas</h2>
          </div>
          {barData.length === 0 ? (
            <p className={styles.emptyState}>Nenhuma transação encontrada para o período.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                <YAxis
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                  width={56}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{value}</span>}
                />
                <Bar dataKey="receitas" name="Receitas" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesas" name="Despesas" fill="var(--color-danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Gráfico de categorias das despesas */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Despesas por Categoria</h2>
          </div>
          {donutData.length === 0 ? (
            <p className={styles.emptyState}>Nenhuma despesa encontrada para o período.</p>
          ) : (
            <DonutChart data={donutData} total={totals.expenses} />
          )}
        </div>
      </div>

    </div>
  );
}
