import { SET_MEALS, SET_DRINKS } from '../actions/actionsTypes';

const INITIAL_STATE = {
  drinks: [],
  meals: [],
};

function menu(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_DRINKS:
    return {
      ...state,
      drinks: action.payload,
    };
  case SET_MEALS:
    return {
      ...state,
      meals: action.payload,
    };
  default:
    return state;
  }
}

export default menu;
