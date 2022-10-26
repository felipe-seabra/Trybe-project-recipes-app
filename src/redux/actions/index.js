import { LOGIN, SET_DRINKS, SET_MEALS, LOGOUT } from './actionsTypes';

export const actLogin = (state) => ({
  type: LOGIN,
  state,
});

export const actSetDrinks = (payload) => ({
  type: SET_DRINKS,
  payload,
});

export const actSetMeals = (payload) => ({
  type: SET_MEALS,
  payload,
});

export const actLogout = () => ({
  type: LOGOUT,
});
