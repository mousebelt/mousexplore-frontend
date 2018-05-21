import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

class Txn extends Component {
  render() {
    const { txn, currency } = this.props;

    return (
      <div className='nrl-txn-flexbox'>
        <div className='nrl-txn-icon'></div>
        <div className='nrl-txn-left'>
          <div className='nrl-txn-id'>TXN {txn.id}</div>
          <div className='nrl-txn-info'>
            <span className='nrl-txn-from'>{txn.from}...</span> to <span className='nrl-txn-to'>{txn.to}...</span>
          </div>
          <div className='nrl-txn-amount'>{txn.amount} {currency.shorthand}</div>
        </div>
        <div className='nrl-txn-right'>
          <span className='nrl-txn-author'>{txn.timestamp}</span>
        </div>
      </div>
    );
  }
}

export default Txn;
