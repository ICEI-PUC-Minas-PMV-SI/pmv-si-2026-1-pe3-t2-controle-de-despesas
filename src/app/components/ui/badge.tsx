import styles from './badge.module.css';
import type { Category } from '~/data/transactions';
import classNames from 'classnames';

interface BadgeProps {
  category: Category;
  className?: string;
}

const CATEGORY_SLUGS: Record<Category, string> = {
  'Alimentação': 'food',
  'Lazer': 'leisure',
  'Contas': 'bills',
  'Saúde': 'health',
  'Transporte': 'transport',
  'Moradia': 'housing',
  'Educação': 'education',
  'Outros': 'other',
  'Salário': 'salary',
  'Renda Extra': 'extra',
};

export function Badge({ category, className }: BadgeProps) {
  const slug = CATEGORY_SLUGS[category];
  return (
    <span className={classNames(styles.badge, styles[`cat_${slug}`], className)}>
      {category}
    </span>
  );
}
