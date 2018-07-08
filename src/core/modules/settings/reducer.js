import { findCoinByCurrency } from 'config';
import axios from 'axios';

import {
  SET_SETTINGS,
  SET_CURRENCY,
  SET_NET_TYPE,
  SET_TICKER
} from './actions';

import { initialState } from '../initialState';

export default function auth(state = initialState.settings, action = {}) {
  const { type, payload } = action;

  let newSettings = state;

  switch (type) {
    case SET_SETTINGS: 
      newSettings = {
        ...state,
        ...payload
      };
      break;

    case SET_CURRENCY:
      if (state.currency !== payload)
        newSettings = {
          ...state,
          currency: payload,
          netType: 'live',
          ticker: undefined,
        };      
      break;

    case SET_NET_TYPE:
      if (state.netType !== payload)
        newSettings = {
          ...state,
          netType: payload,
          ticker: undefined
        };
      break;

    case SET_TICKER:
      if (state.ticker !== payload)
        newSettings = {
          ...state,
          ticker: payload
        };
      break;

    default: 
      newSettings = state;
      break;
  }

  if (newSettings.currency !== state.currency || newSettings.netType !== state.netType || !newSettings.apiObject) {
    const coin = findCoinByCurrency(newSettings.currency);

    if (newSettings.apiObject) {
      delete newSettings.apiObject;
    }

    newSettings.apiObject = axios.create({
      baseURL: newSettings.netType === 'test' ? coin.api.test : coin.api.live,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  return newSettings;
}
