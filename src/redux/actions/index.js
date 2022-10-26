import { LOGIN, LOGOUT } from './actionsTypes';

export const actLogin = (state) => ({
  type: LOGIN,
  state,
});

export const actLogout = () => ({
  type: LOGOUT,
});
