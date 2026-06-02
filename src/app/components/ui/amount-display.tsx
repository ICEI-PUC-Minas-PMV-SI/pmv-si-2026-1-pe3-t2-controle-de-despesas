import classNames from 'classnames';
import styles from './amount-display.module.css';

interface AmountDisplayProps {
  amount: number;
  type?: 'income' | 'expense' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AmountDisplay({ amount, type = 'neutral', size = 'md', className }: AmountDisplayProps) {
  const prefix = type === 'income' ? '+' : type === 'expense' ? '-' : '';
  const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  return (
    <span className={classNames(styles.amount, styles[type], styles[size], className)}>
      {prefix}{formatted}
    </span>
  );
}
