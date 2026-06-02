import { useForm } from 'react-hook-form';
import { useState } from 'react';
import type { TransactionInput } from '~/hooks/use-finance-store';
import type { Transaction, Category, TransactionType } from '~/data/transactions';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '~/data/transactions';
import { IconCalendar, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import styles from './transaction-form.module.css';

interface TransactionFormProps {
  defaultType?: TransactionType;
  initialValues?: Transaction;
  lockType?: boolean;
  onSubmit: (data: TransactionInput) => void;
  onCancel?: () => void;
  submitLabel?: string;
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

function parseCurrencyBR(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;

  const normalized = value
    .trim()
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function DatePickerField({
  value,
  hasError,
  onChange,
}: {
  value: string;
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
  const todayIso = toIsoDate(new Date());

  function changeMonth(step: number) {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + step, 1));
  }

  function chooseDate(day: number) {
    onChange(toIsoDate(new Date(year, month, day)));
    setIsOpen(false);
  }

  return (
    <div className={styles.datePicker}>
      <button
        type="button"
        className={[styles.input, styles.dateButton, hasError ? styles.inputError : ''].join(' ')}
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

export function TransactionForm({
  defaultType = 'expense',
  initialValues,
  lockType = false,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
}: TransactionFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TransactionInput>({
    defaultValues: initialValues
      ? { ...initialValues }
      : {
          type: defaultType,
          amount: undefined,
          category: defaultType === 'expense' ? 'Alimentação' : 'Salário',
          description: '',
          date: new Date().toISOString().split('T')[0],
          notes: '',
        },
  });

  const selectedType = watch('type');
  const selectedDate = watch('date');
  const categories: Category[] = selectedType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {lockType ? (
        <input type="hidden" value={selectedType} {...register('type')} />
      ) : (
        <div className={styles.typeToggle}>
          <label className={[styles.typeBtn, selectedType === 'expense' ? styles.typeBtnExpense : ''].join(' ')}>
            <input type="radio" value="expense" {...register('type')} />
            Despesa
          </label>
          <label className={[styles.typeBtn, selectedType === 'income' ? styles.typeBtnIncome : ''].join(' ')}>
            <input type="radio" value="income" {...register('type')} />
            Receita
          </label>
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label}>Descrição</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Qual foi o gasto ou recebimento?"
          {...register('description')}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Valor (R$) <span className={styles.required}>*</span></label>
          <input
            type="text"
            inputMode="decimal"
            className={[styles.input, errors.amount ? styles.inputError : ''].join(' ')}
            placeholder="0,00"
            {...register('amount', {
              required: 'Valor obrigatório',
              setValueAs: parseCurrencyBR,
              min: { value: 0.01, message: 'Deve ser > 0' },
            })}
          />
          {errors.amount && <span className={styles.error}>{errors.amount.message}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Data <span className={styles.required}>*</span></label>
          <input type="hidden" {...register('date', { required: 'Data obrigatória' })} />
          <DatePickerField
            value={selectedDate}
            hasError={!!errors.date}
            onChange={(value) => setValue('date', value, { shouldValidate: true })}
          />
          {errors.date && <span className={styles.error}>{errors.date.message}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Categoria <span className={styles.required}>*</span></label>
        <select className={styles.input} {...register('category', { required: true })}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Observação</label>
        <textarea
          rows={3}
          className={[styles.input, styles.textarea].join(' ')}
          placeholder="Informações adicionais (opcional)"
          {...register('notes')}
        />
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className={[styles.submitBtn, selectedType === 'income' ? styles.submitIncome : styles.submitExpense].join(' ')}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
