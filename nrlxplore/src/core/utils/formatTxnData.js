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
  'XLM': {
    'hash': 'id',
    'opCount': 'operation_count',
    'fee': 'fee_paid',
    'timestamp': 'created_at',
    'account': 'source_account',
    'accountSequence': 'source_account_sequence',
    'ledger': 'ledger_attr'
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
