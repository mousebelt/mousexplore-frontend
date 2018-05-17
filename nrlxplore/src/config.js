export const coins = {
  'BTC': {
    name: 'Bitcoin',
    currency: 'BTC',
    hasTokens: false,
    tokens: [],  
  },

  'ETH': {
    name: 'Ethereum',
    currency: 'ETH',
    hasTokens: true,
    tokens: [
      { tokenName: 'TRONix', ticker: 'TRON' },
      { tokenName: 'VeChain', ticker: 'VEN' },
      { tokenName: 'Binance Coin', ticker: 'BNB' },
      { tokenName: 'OmiseGO', ticker: 'OMG' },
      { tokenName: 'Zilliqa', ticker: 'ZIL' },
    ],
  },

  'LTC': {
    name: 'Litecoin',
    currency: 'LTC',
    hasTokens: false,
    tokens: [],
  },

  'NEO': {
    name: 'NEO',
    currency: 'NEO',
    hasTokens: true,
    tokens: [
      { tokenName: 'lrnToken', ticker: 'LRN' },
      { tokenName: 'Trinity Network Credit', ticker: 'TNC' },
      { tokenName: 'Qlink Token', ticker: 'QLC' },
      { tokenName: 'Orbis', ticker: 'OBT' },
      { tokenName: 'THKEY', ticker: 'TKY' },
    ],
  },
  
  'XLM': {
    name: 'Stellar',
    currency: 'XLM',
    hasTokens: true,
    tokens: [
      { tokenName: 'Mobius', ticker: 'MOBI' },
      { tokenName: 'Repocoin', ticker: 'REPO' },
      { tokenName: 'Firefly', ticker: 'XCN' },
      { tokenName: 'Diruna', ticker: 'DRA' },
      { tokenName: 'Smartlands', ticker: 'SLT' },
    ],
  },
};