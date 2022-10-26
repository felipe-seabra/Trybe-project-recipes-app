import { combineReducers } from 'redux';
import login from './login';
import menu from './menu';

const rootReducer = combineReducers({
  login,
  menu,
});
export default rootReducer;
