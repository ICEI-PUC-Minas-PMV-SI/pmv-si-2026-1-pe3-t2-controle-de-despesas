export interface User {
  name: string;
  email: string;
  currency: string;
  dateFormat: string;
}

export const INITIAL_USER: User = {
  name: 'Usuário CDD',
  email: 'usuario@cdd.com',
  currency: 'BRL',
  dateFormat: 'DD/MM/YYYY',
};
