import { LOGIN, SET_DRINKS, SET_MEALS } from './actionsTypes';

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
