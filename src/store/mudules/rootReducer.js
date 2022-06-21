import { combineReducers } from 'redux';
import auth from './auth/reducer';

// recebe um objeto
export default combineReducers({
  auth,
});
