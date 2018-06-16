const mapTxnKeys = {
  'BTC': {
    'blockHash': 'blockhash',
    'hash': 'hash',    
    'timestamp': 'blocktime',
    'confirmations': 'confirmations',
    'vsize': 'vsize',
  },
  'ETH': {
    'blockHash': 'blockHash',
    'hash': 'hash',    
    'timestamp': 'timestamp',
    'confirmations': 'confirmations',
    'vsize': 'v',
  },
  'LTC': {
    'blockHash': 'blockhash',
    'hash': 'hash',
    'timestamp': 'blocktime',
    'confirmations': 'confirmations',
    'vsize': 'vsize',
  },
  'NEO': {
    'blockHash': 'blockhash',
    'hash': 'txid',    
    'timestamp': 'blocktime',
    'confirmations': 'confirmations',
    'vsize': 'vsize',
  },
  'XML': {
    'hash': 'id',
    'operationCount': 'operation_count',
    'fee': 'fee_paid'
  }
};

export function formatTxnData(block, currency) {
  const mapping = mapTxnKeys[currency] || {};

  const formattedTxn = {
    ...block
  };

  for (let key in mapping) {
    formattedTxn[key] = formattedTxn[mapping[key]];

    // if (formattedTxn[mapping[key]])
    //   delete formattedTxn[mapping[key]];
  }

  return formattedTxn;
}
