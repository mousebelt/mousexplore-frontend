import { coins, defaultCoin } from 'config';

const settings = {
  currency: defaultCoin || coins[0].currency,
  netType: 'live',
  token: undefined,
};

export const initialState = {
  settings
};
