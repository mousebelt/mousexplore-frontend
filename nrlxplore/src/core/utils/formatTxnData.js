const mapTxnKeys = {
  'BTC': {
    'blockHash': 'blockhash',
    'hash': 'hash',    
    'timestamp': 'time',
    'confirmations': 'confirmations',
    'bits': 'bits',
    'vsize': 'vsize',
  },
  'ETH': {
    'blockHash': 'blockHash',
    'hash': 'hash',    
    'timestamp': 'time',
    'confirmations': 'confirmations',
    'bits': 'bits',
    'vsize': 'v',
  },
  'LTC': {
    'height': 'height',
    'hash': 'hash',    
    'nextHash': 'nextblockhash',
    'prevHash': 'previousblockhash',
    'txns': 'tx',
    'timestamp': 'time',
    'nonce': 'nonce',        
    'difficulty': 'difficulty',   
    'merkleRoot': 'merkleroot',
    'confirmations': 'confirmations',
    'bits': 'bits',
    'size': 'size',
  },
  'NEO': {
    'height': 'index',
    'hash': 'hash',    
    'nextHash': 'nextblockhash',
    'prevHash': 'previousblockhash',
    'txns': 'tx',
    'timestamp': 'time',
    'nonce': 'nonce',   
    'merkleRoot': 'merkleroot',
    // 'difficulty': 'difficulty',   
    'confirmations': 'confirmations',
    // 'bits': 'bits',
    'size': 'size',
  },
  'XML': {

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
