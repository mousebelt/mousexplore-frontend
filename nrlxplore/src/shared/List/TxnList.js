import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

import Txn from '../Txn/Txn'

class TxnList extends Component {
  render() {
    const { list, currency } = this.props;

    return (
      <div className="list">
        {
          (list && (list.length > 0)) &&
            list.map((item, index) => (
              <Txn
                key={index}
                txn={item}
                currency={currency}
              />
            ))
        }
      </div>
    );
  }
}

export default TxnList;
