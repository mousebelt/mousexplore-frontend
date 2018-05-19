import {
  SET_SETTINGS,
  SET_CURRENCY,
  SET_NET_TYPE,
  SET_TOKEN
} from './actions';

import { initialState } from '../initialState';

export default function auth(state = initialState.settings, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SET_SETTINGS: 
      return {
        ...state,
        ...payload
      };
    case SET_CURRENCY:
      return {
        ...state,
        currency: payload
      };
    case SET_NET_TYPE:
      return {
        ...state,
        netType: payload
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload
      };
    default: 
      return state;
  }
}
