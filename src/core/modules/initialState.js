import { coins, defaultCoin } from 'config';

const settings = {
  currency: defaultCoin || coins[0].currency,
  netType: 'live',
  ticker: undefined,
  apiObject: undefined,
  initializedRoute: false,
};

export const initialState = {
  settings
};
