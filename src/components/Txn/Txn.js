import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class Txn extends PureComponent {
  render() {
    const { className, currency, txnHash, onPrevClick, onNextClick, children } = this.props;

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
              <Link to={`/${currency.toLowerCase()}/transaction/${txnHash}`}>{txnHash}</Link>
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
