import type { Route } from './+types/cadastro';
import styles from './cadastro.module.css';
import { RegisterForm } from '~/components/landing/register-form';
import { Link } from 'react-router';
import { IconWallet, IconArrowLeft } from '@tabler/icons-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Criar conta – CDD' },
    {
      name: 'description',
      content: 'Crie sua conta no CDD – Controle De Despesas e comece a organizar suas finanças pessoais gratuitamente.',
    },
  ];
}

export default function Cadastro() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <div className={styles.brandIcon} aria-hidden="true">
              <IconWallet size={26} stroke={2} />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>CDD</span>
              <span className={styles.brandTagline}>Controle De Despesas</span>
            </div>
          </div>

          <Link to="/" className={styles.backLink} aria-label="Voltar para a página inicial">
            <IconArrowLeft size={16} aria-hidden="true" />
            Voltar
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Crie sua conta</h1>
            <p className={styles.cardSubtitle}>
              Gratuito e sem integração bancária — seus dados ficam com você.
            </p>
          </div>

          <RegisterForm />

          <p className={styles.loginHint}>
            Já tem conta?{' '}
            <Link to="/" className={styles.loginLink}>
              Acessar o sistema
            </Link>
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} CDD &mdash; Controle De Despesas. Uso individual &middot; Dados armazenados localmente.</p>
      </footer>
    </div>
  );
}
