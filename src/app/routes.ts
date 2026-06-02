import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('cadastro', 'routes/cadastro.tsx'),
  layout('routes/app-layout.tsx', [
    route('dashboard', 'routes/dashboard.tsx'),
    route('transactions', 'routes/transactions.tsx'),
    route('reports', 'routes/reports.tsx'),
    route('settings', 'routes/settings.tsx'),
  ]),
] satisfies RouteConfig;
