import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconFilter,
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconAlertTriangle,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { useAppContext } from '~/hooks/use-app-context';
import { Modal } from '~/components/ui/modal';
import { TransactionForm } from '~/components/ui/transaction-form';
import { Badge } from '~/components/ui/badge';
import { AmountDisplay } from '~/components/ui/amount-display';
import type { Transaction, TransactionType } from '~/data/transactions';
import { ALL_CATEGORIES } from '~/data/transactions';
import type { TransactionInput } from '~/hooks/use-finance-store';
import type { Route } from './+types/transactions';
import styles from './transactions.module.css';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Transações – CDD' }];
}

type ToastType = 'success' | 'error';
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface DeleteConfirmState {
  id: string;
  description: string;
}

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
  value,
  min,
  max,
  title,
  onChange,
}: {
  value: string;
  min?: string;
  max?: string;
  title: string;
  onChange: (value: string) => void;
}) {
  const initialDate = value ? getLocalDate(value) : new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
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
        type="button"
        className={[styles.filterSelect, styles.dateButton].join(' ')}
        onClick={() => setIsOpen((open) => !open)}
        title={title}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={value ? styles.dateButtonValue : styles.dateButtonPlaceholder}>
          {value ? formatDateBR(value) : 'dd/mm/aaaa'}
        </span>
        <IconCalendar size={16} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.calendarPanel} role="dialog" aria-label={`${title} em português`}>
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
              return (
                <button
                  key={day}
                  type="button"
                  className={[
                    styles.calendarDay,
                    iso === value ? styles.calendarDaySelected : '',
                    iso === todayIso ? styles.calendarDayToday : '',
                  ].join(' ')}
                  onClick={() => chooseDate(day)}
                  disabled={isDisabled(day)}
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

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return { toasts, addToast };
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null;
  return (
    <div className={styles.toastContainer}>
      {toasts.map((t) => (
        <div key={t.id} className={[styles.toast, t.type === 'error' ? styles.toastError : styles.toastSuccess].join(' ')}>
          {t.type === 'success' ? <IconCheck size={16} /> : <IconAlertTriangle size={16} />}
          {t.message}
        </div>
      ))}
    </div>
  );
}

function ConfirmDeleteModal({ state, onConfirm, onCancel }: { state: DeleteConfirmState; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal open title="Confirmar exclusão" onClose={onCancel}>
      <div className={styles.confirmBody}>
        <div className={styles.confirmIcon}>
          <IconAlertTriangle size={32} />
        </div>
        <p className={styles.confirmText}>
          Deseja realmente excluir o lançamento <strong>&ldquo;{state.description}&rdquo;</strong>?
          Esta ação não pode ser desfeita.
        </p>
        <div className={styles.confirmActions}>
          <button className={styles.cancelBtnSm} onClick={onCancel}>Cancelar</button>
          <button className={styles.deleteBtnConfirm} onClick={onConfirm}>
            <IconTrash size={15} /> Excluir
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function Transactions() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useAppContext();

  // Estados dos modais.
  const [newExpenseOpen, setNewExpenseOpen] = useState(false);
  const [newIncomeOpen, setNewIncomeOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState | null>(null);

  // Filtros da tabela.
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  const { toasts, addToast } = useToasts();

  const filtered = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          !search ||
          tx.description.toLowerCase().includes(search.toLowerCase()) ||
          tx.category.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'all' || tx.type === filterType;
        const matchesCategory = filterCategory === 'all' || tx.category === filterCategory;
        const matchesFrom = !filterDateFrom || tx.date >= filterDateFrom;
        const matchesTo = !filterDateTo || tx.date <= filterDateTo;
        return matchesSearch && matchesType && matchesCategory && matchesFrom && matchesTo;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, search, filterType, filterCategory, filterDateFrom, filterDateTo]);

  const handleAddExpense = (data: TransactionInput) => {
    addTransaction({ ...data, type: 'expense' });
    setNewExpenseOpen(false);
    addToast('Despesa registrada com sucesso!');
  };

  const handleAddIncome = (data: TransactionInput) => {
    addTransaction({ ...data, type: 'income' });
    setNewIncomeOpen(false);
    addToast('Receita registrada com sucesso!');
  };

  const handleEdit = (data: TransactionInput) => {
    if (editingTx) {
      updateTransaction(editingTx.id, { ...data, type: editingTx.type });
      setEditingTx(null);
      addToast('Lançamento atualizado com sucesso!');
    }
  };

  const confirmDelete = (tx: Transaction) => {
    setDeleteConfirm({ id: tx.id, description: tx.description || 'Lançamento' });
  };

  const handleDeleteConfirmed = () => {
    if (deleteConfirm) {
      deleteTransaction(deleteConfirm.id);
      setDeleteConfirm(null);
      addToast('Lançamento excluído.');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setFilterType('all');
    setFilterCategory('all');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  const hasActiveFilters = search || filterType !== 'all' || filterCategory !== 'all' || filterDateFrom || filterDateTo;

  return (
    <div className={styles.page}>
      <ToastContainer toasts={toasts} />

      {/* Cabeçalho */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Transações</h1>
          <p className={styles.pageSubtitle}>
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.expenseBtn} onClick={() => setNewExpenseOpen(true)}>
            <IconArrowDown size={17} />
            Nova Despesa
          </button>
          <button className={styles.incomeBtn} onClick={() => setNewIncomeOpen(true)}>
            <IconArrowUp size={17} />
            Nova Receita
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersHeader}>
          <span className={styles.filtersLabel}>
            <IconFilter size={15} />
            Filtros
          </span>
          {hasActiveFilters && (
            <button className={styles.clearFiltersBtn} onClick={clearFilters}>
              Limpar filtros
            </button>
          )}
        </div>
        <div className={styles.filtersGrid}>
          <div className={styles.searchWrapper}>
            <IconSearch size={15} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar por descrição ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as TransactionType | 'all')}
          >
            <option value="all">Todos os tipos</option>
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>

          <select
            className={styles.filterSelect}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Todas as categorias</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className={styles.dateRange}>
            <DateFilterPicker
              value={filterDateFrom}
              title="Data inicial"
              max={filterDateTo || undefined}
              onChange={setFilterDateFrom}
            />
            <span className={styles.dateSep}>até</span>
            <DateFilterPicker
              value={filterDateTo}
              title="Data final"
              min={filterDateFrom || undefined}
              onChange={setFilterDateTo}
            />
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className={styles.tableWrapper}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Nenhum lançamento encontrado</p>
            <p className={styles.emptyHint}>Ajuste os filtros ou crie um novo lançamento.</p>
            <div className={styles.emptyActions}>
              <button className={styles.expenseBtn} onClick={() => setNewExpenseOpen(true)}>
                <IconArrowDown size={16} /> Nova Despesa
              </button>
              <button className={styles.incomeBtn} onClick={() => setNewIncomeOpen(true)}>
                <IconArrowUp size={16} /> Nova Receita
              </button>
            </div>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.th}>Data</th>
                <th className={styles.th}>Descrição</th>
                <th className={styles.th}>Tipo</th>
                <th className={styles.th}>Categoria</th>
                <th className={[styles.th, styles.thRight].join(' ')}>Valor</th>
                <th className={[styles.th, styles.thCenter].join(' ')}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id} className={styles.tableRow}>
                  <td className={styles.td}>
                    <span className={styles.dateCell}>
                      {new Date(tx.date + 'T00:00:00').toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.descCell} title={tx.description}>
                      {tx.description || '—'}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={tx.type === 'income' ? styles.typeBadgeIncome : styles.typeBadgeExpense}>
                      {tx.type === 'income' ? (
                        <><IconArrowUp size={12} /> Receita</>
                      ) : (
                        <><IconArrowDown size={12} /> Despesa</>
                      )}
                    </span>
                  </td>
                  <td className={styles.td}><Badge category={tx.category} /></td>
                  <td className={[styles.td, styles.tdRight].join(' ')}>
                    <AmountDisplay amount={tx.amount} type={tx.type} />
                  </td>
                  <td className={[styles.td, styles.tdCenter].join(' ')}>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => setEditingTx(tx)}
                        title="Editar lançamento"
                        aria-label="Editar lançamento"
                      >
                        <IconEdit size={15} />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => confirmDelete(tx)}
                        title="Excluir lançamento"
                        aria-label="Excluir lançamento"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modais */}
      <Modal open={newExpenseOpen} onClose={() => setNewExpenseOpen(false)} title="Nova Despesa">
        <TransactionForm
          defaultType="expense"
          lockType
          onSubmit={handleAddExpense}
          onCancel={() => setNewExpenseOpen(false)}
          submitLabel="Registrar Despesa"
        />
      </Modal>

      <Modal open={newIncomeOpen} onClose={() => setNewIncomeOpen(false)} title="Nova Receita">
        <TransactionForm
          defaultType="income"
          lockType
          onSubmit={handleAddIncome}
          onCancel={() => setNewIncomeOpen(false)}
          submitLabel="Registrar Receita"
        />
      </Modal>

      <Modal open={!!editingTx} onClose={() => setEditingTx(null)} title="Editar Lançamento">
        {editingTx && (
          <TransactionForm
            initialValues={editingTx}
            lockType
            onSubmit={handleEdit}
            onCancel={() => setEditingTx(null)}
            submitLabel="Salvar Alterações"
          />
        )}
      </Modal>

      {deleteConfirm && (
        <ConfirmDeleteModal
          state={deleteConfirm}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
