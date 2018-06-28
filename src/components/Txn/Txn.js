import React, { PureComponent } from 'react';
import HashLink from 'components/HashLink/HashLink'

class Txn extends PureComponent {
  render() {
    const { className, currency, txnHash, children } = this.props;

    return (
      <div className={`nrl__txn${className ? ' ' + className : ''}`}>
        <div className="nrl__txn-header">
          <div className="nrl__txn-header--icon">
            <i className="fa fa-long-arrow-left"/>
          </div>
          <div className="nrl__txn-header--title">
            <h5>{currency} Transaction Information</h5>
            <p>
              TXN Hash:&nbsp;
              <HashLink hash={txnHash} type="transaction">{txnHash}</HashLink>
            </p>
          </div>
        </div>
        <div className="nrl__txn-content">
          {
            children
          }
        </div>
      </div>
    );
  }
}

export default Txn;
