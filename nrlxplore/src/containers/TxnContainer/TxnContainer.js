import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

import TxnList from 'components/List/TxnList';

const mockCurrency = {
  shorthand: 'BTC',
  full: 'Bitcoin'
}

const mockTxns = [
  {
    id: '317fb03f13',
    from: '323392aba4d7df996790b4dcbf7062d0',
    to: 'a3e7022f156fd320e28484ca6dab9b39',
    amount: 0.234,
    timestamp: 'n/a'
  },
  {
    id: '7204ee1316',
    from: 'e910d8bb2a7e41c7d56d4019b97094b6',
    to: 'aef14908080fe55b81944c5cb7348aa7',
    amount: 0.114,
    timestamp: 'n/a'
  },
  {
    id: '76dd5ebfb0',
    from: 'f6a197fdfaed5bc4735b59e74dbeedf8',
    to: '2cd89400b150a817a1258b38e07340d0',
    amount: 0.009,
    timestamp: 'n/a'
  },
  {
    id: '009e3f8a0c',
    from: '817a1b17cfbde176e6fde31b24a4abef',
    to: 'ab687e1611d0a4e305aed954606bd05c',
    amount: 1.109,
    timestamp: 'n/a'
  }
]

class TxnContainer extends Component {
  render() {
    return (
      <div className="txn-list-container">
        <div className='txn-list-header'>Transactions</div>
        <TxnList list={mockTxns} currency={mockCurrency} />
      </div>
    );
  }
}

export default TxnContainer;
