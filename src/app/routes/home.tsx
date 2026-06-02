import { useState } from 'react';
import { Link } from 'react-router';
import {
  IconWallet,
  IconChartBar,
  IconShieldCheck,
  IconDeviceMobile,
  IconArrowRight,
  IconCircleCheck,
} from '@tabler/icons-react';
import type { Route } from './+types/home';
import styles from './home.module.css';
import { ForgotPasswordModal } from '~/components/landing/forgot-password-modal';
import { LoginForm } from '~/components/landing/login-form';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CDD – Controle De Despesas' },
    {
      name: 'description',
      content:
        'Registre, acompanhe e analise suas despesas de forma simples, segura e acessível. Retome o controle das suas finanças pessoais.',
    },
  ];
}

const PILLARS = [
  { icon: IconChartBar,       text: 'Visualize seus gastos em gráficos claros' },
  { icon: IconCircleCheck,    text: 'Categorize despesas automaticamente' },
  { icon: IconShieldCheck,    text: 'Seus dados protegidos e privados' },
  { icon: IconDeviceMobile,   text: 'Acesse de qualquer dispositivo' },
];

export default function Home() {
  const [showForgot, setShowForgot] = useState(false);

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
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-label="Proposta de valor do CDD">
          <div className={styles.heroBadge} aria-label="Categoria do sistema">
            Gestão Financeira Pessoal
          </div>

          <h1 className={styles.heroTitle}>
            Pare de perder o controle do seu dinheiro
          </h1>

          <p className={styles.heroSubtitle}>
            O CDD transforma anotações confusas em gráficos claros e cálculos automáticos.
            Saiba exatamente quanto gastou, quanto pode gastar e tome decisões financeiras
            mais inteligentes — tudo em um só lugar.
          </p>

          <ul className={styles.heroPillars} aria-label="Benefícios do sistema">
            {PILLARS.map(({ icon: Icon, text }) => (
              <li key={text} className={styles.pillarItem}>
                <span className={styles.pillarIcon} aria-hidden="true">
                  <Icon size={16} stroke={2.2} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <p className={styles.heroStat}>
            <strong>80,2%</strong> das famílias brasileiras têm dívidas.
            <span className={styles.heroStatSub}> Comece a mudar esse número hoje.</span>
          </p>
        </section>

        <section className={styles.authArea} aria-label="Área de autenticação">
          <div className={styles.authCard}>
            <div className={styles.authCardHeader}>
              <h2 className={styles.authTitle}>Acesse sua conta</h2>
              <p className={styles.authSubtitle}>Digite seu e-mail e senha para entrar</p>
            </div>

            <LoginForm onForgotPassword={() => setShowForgot(true)} />

            <div className={styles.authDivider}>
              <span>Novo por aqui?</span>
            </div>

            <div className={styles.authRegister}>
              <Link to="/cadastro" className={styles.registerLink}>
                Criar conta gratuita
                <IconArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} CDD &mdash; Controle De Despesas.{' '}
          Uso individual &middot; Dados armazenados localmente.
        </p>
      </footer>

      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </div>
  );
}
