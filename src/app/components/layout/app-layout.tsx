import { Outlet, NavLink, useNavigate } from 'react-router';
import {
  IconLayoutDashboard,
  IconList,
  IconUserCog,
  IconWallet,
  IconLogout,
} from '@tabler/icons-react';
import styles from './app-layout.module.css';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Painel Financeiro', icon: IconLayoutDashboard },
  { to: '/transactions', label: 'Transações', icon: IconList },
  { to: '/settings', label: 'Gerenciar Perfil', icon: IconUserCog },
];

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandIconWrap} aria-hidden="true">
            <IconWallet size={22} stroke={2} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>CDD</span>
            <span className={styles.brandTagline}>Controle De Despesas</span>
          </div>
        </div>
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <IconLogout size={20} />
          <span>Sair</span>
        </button>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
