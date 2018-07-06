import React, { PureComponent } from 'react';
import HashLink from 'components/HashLink/HashLink'
import Spinner from 'components/Spinner/Spinner';

class Txn extends PureComponent {
  render() {
    const { className, currency, txnHash, children, isLoading } = this.props;
    
    return (
      <div className={`nrl__txn${className ? ' ' + className : ''}`}>
        <div className="nrl__txn-header">
          <div className="nrl__txn-header--title">
            <h5>{currency} Transaction Information</h5>
            <p>
              <span>TXN Hash:&nbsp;</span>
              <HashLink hash={txnHash} type="transaction">{txnHash}</HashLink>
            </p>
          </div>
        </div>
        <div className="nrl__txn-content">
          {
            isLoading ? <Spinner/> : children
          }
        </div>
      </div>
    );
  }
}

export default Txn;
