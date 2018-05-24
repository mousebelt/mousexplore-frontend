import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import List from 'components/List/List';

const mockTransactions = [
  {
    hash: '0x9cd5932a5b87afaf69f091939534b292fed475b1052446db85296e34d2e4dec8',
    from: '0x3110960ea5e6cfd443c8abc412f033cad1b07694',
    to: '0x2a47d6294f8f77e48211ac4328a3eab66f5a1c940x2',
    timestamp: 'n/a'
  },
  {
    hash: '0x9cd5932a5b87afaf69f091939534b292fed475b1052446db85296e34d2e4dec8',
    from: '0x3110960ea5e6cfd443c8abc412f033cad1b07694',
    to: '0x2a47d6294f8f77e48211ac4328a3eab66f5a1c940x2',
    timestamp: 'n/a'
  },
  {
    hash: '0x9cd5932a5b87afaf69f091939534b292fed475b1052446db85296e34d2e4dec8',
    from: '0x3110960ea5e6cfd443c8abc412f033cad1b07694',
    to: '0x2a47d6294f8f77e48211ac4328a3eab66f5a1c940x2',
    timestamp: 'n/a'
  },
  {
    hash: '0x9cd5932a5b87afaf69f091939534b292fed475b1052446db85296e34d2e4dec8',
    from: '0x3110960ea5e6cfd443c8abc412f033cad1b07694',
    to: '0x2a47d6294f8f77e48211ac4328a3eab66f5a1c940x2',
    timestamp: 'n/a'
  },
  {
    hash: '0x9cd5932a5b87afaf69f091939534b292fed475b1052446db85296e34d2e4dec8',
    from: '0x3110960ea5e6cfd443c8abc412f033cad1b07694',
    to: '0x2a47d6294f8f77e48211ac4328a3eab66f5a1c940x2',
    timestamp: 'n/a'
  },
]

class LatestTransactons extends PureComponent {
  _renderTransaction = (transaction) => (
    <div className="transaction">
      <i className="fa fa-credit-card icon"/>
      <div className="detail">
        <div className="hash">
          <Link to={`/eth/transaction/${transaction.hash}`}>
            {transaction.hash}
          </Link>
        </div>
        <div className="from">
          From: &nbsp;
          <Link to={`/eth/address/${transaction.from}`}>
            {transaction.from}
          </Link>
        </div>
        <div className="to">
          To: &nbsp;
          <Link to={`/eth/address/${transaction.to}`}>
            {transaction.to}
          </Link>
        </div>
      </div>
      <span className="time">
        <i className="fa fa-clock-o"/> {transaction.timestamp}
      </span>
    </div>
  )

  render() {
    return (
      <List
        className="latest-transactions"
        icon={<i className="fa fa-credit-card"/>}
        title="Transactions"
        linkToAll="#"
        data={mockTransactions}
        renderItem={this._renderTransaction}
      />
    );
  }
}

export default LatestTransactons;