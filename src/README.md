# CDD - Controle de Despesas

## Link para acesso do deploy do código fonte:
- https://pmv-si-2026-1-pe3-t2-controle-de-de.vercel.app/

## Funcionalidades

- Cadastro de usuário.
- Login no sistema.
- Recuperação de senha simulada.
- Painel financeiro com saldo, receitas e despesas.
- Cadastro de novas receitas.
- Cadastro de novas despesas.
- Edição e exclusão de transações.
- Filtros por descrição, tipo, categoria e período.
- Relatórios financeiros com gráficos.
- Gerenciamento de perfil do usuário.
- Armazenamento dos dados no navegador.

## Tecnologias utilizadas

- React: usado para construir as telas do sistema.
- React Router: usado para organizar a navegação entre as páginas.
- TypeScript: usado para deixar o código mais organizado e com tipos.
- Vite: usado para executar e gerar o projeto.
- CSS Modules: usado para separar os estilos de cada tela e componente.
- Recharts: usado para criar os gráficos financeiros.
- localStorage: usado para salvar os dados no navegador.

## Estrutura do projeto

```text
app/
  components/   Componentes usados em mais de uma tela
  data/         Dados iniciais e categorias do sistema
  hooks/        Estados e regras principais da aplicação
  routes/       Telas do sistema
  styles/       Estilos globais

public/         Arquivos públicos do projeto
```

Arquivos principais:

- `app/hooks/use-finance-store.ts`: controla transações, usuário e armazenamento local.
- `app/data/transactions.ts`: contém categorias e transações iniciais de exemplo.
- `app/routes/dashboard.tsx`: tela do painel financeiro.
- `app/routes/transactions.tsx`: tela de transações.
- `app/routes/reports.tsx`: tela de relatórios.
- `app/routes/settings.tsx`: tela de perfil.

## Armazenamento dos dados

Nesta versão, o sistema utiliza o `localStorage` do navegador.

Isso significa que os dados ficam salvos no próprio navegador do usuário. As receitas, despesas e informações de perfil continuam disponíveis ao atualizar a página ou fechar e abrir o navegador novamente.

O sistema não utiliza banco de dados externo nesta etapa. Também não possui integração com banco digital, cartão, Pix ou serviços financeiros.

As principais chaves usadas no `localStorage` são:

- `cdd-transactions`: transações cadastradas.
- `cdd-user`: dados do usuário.
- `cdd-data-version`: controle da versão dos dados de exemplo.

## Limitações atuais

- O login é uma simulação para demonstração acadêmica.
- A recuperação de senha também é simulada.
- Os dados ficam apenas no navegador em que foram cadastrados.
- Se o armazenamento local for apagado, os dados cadastrados pelo usuário serão perdidos.
- Ainda não há integração com back-end ou banco de dados.

## Observação acadêmica

Este projeto representa uma versão front-end funcional do sistema. Ele demonstra os fluxos principais esperados para um controle de despesas pessoais, mas ainda pode evoluir futuramente com autenticação real, banco de dados, API própria e hospedagem em ambiente externo.
