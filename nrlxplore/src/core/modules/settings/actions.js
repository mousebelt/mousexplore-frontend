import { createAction } from 'redux-actions';

export const SET_SETTINGS = '@settings/SET_SETTINGS';
export const SET_CURRENCY = '@settings/SET_CURRENCY';
export const SET_NET_TYPE = '@settings/SET_NET_TYPE';
export const SET_TOKEN    = '@settings/SET_TOKEN';

/**
 * Action Creators
 */
export const settingsActionCreators = {
  setSettings: createAction(SET_SETTINGS),
  setCurrency: createAction(SET_CURRENCY),
  setNetType: createAction(SET_NET_TYPE),
  setToken: createAction(SET_TOKEN),
};
