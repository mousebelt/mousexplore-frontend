import {
  auth,
} from '../modules';

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  auth,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);

  return finalState;
}
