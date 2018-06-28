const mapBlockKeys = {
  'BTC': {
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
  'ETH': {
    'height': 'number',
    'hash': 'hash',    
    // 'nextHash': 'nextblockhash',
    'prevHash': 'parentHash',
    'txns': 'transactions',
    'timestamp': 'timestamp',
    'nonce': 'nonce',
    'difficulty': 'difficulty',
    // 'confirmations': 'confirmations',
    // 'merkleRoot': 'merkleroot',   
    // 'bits': 'bits',
    'size': 'size',
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
  'XLM': {
    'height': 'sequence',
    'hash': 'hash',
    'prevHash': 'prev_hash',
    'txnCount': 'transaction_count',
    'opCount': 'operation_count',
    'totalCoins': 'total_coins',
    'fee': 'fee_pool',
    'baseFee': 'base_fee_in_stroops',
    'baseReserve': 'base_reserve_in_stroops',
    'timestamp': 'closed_at'
  }
};

export function formatBlockData(block, currency) {
  const mapping = mapBlockKeys[currency] || {};

  const formattedBlock = {
    ...block
  };

  for (let key in mapping) {
    formattedBlock[key] = formattedBlock[mapping[key]];

    // if (formattedBlock[mapping[key]])
    //   delete formattedBlock[mapping[key]];
  }

  return formattedBlock;
}
