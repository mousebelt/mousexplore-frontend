import React, { PureComponent } from 'react';
import { Button } from 'antd';

class Txn extends PureComponent {
  render() {
    const { className, currency, txnId, onPrevClick, onNextClick, children } = this.props;

    return (
      <div className={`txn${className ? ' ' + className : ''}`}>
        <div className="txn__header">
          <div className="txn__header-icon">
            <i className="fa fa-long-arrow-left"/>
          </div>
          <div className="txn__header-title">
            <h5>{currency} Transaction Information</h5>
            <p>TXN Hash: {txnId}</p>
          </div>
          <div className="txn__header-actions">
            <Button
              shape="circle"
              icon="left"
              onClick={this.onPrevClick}
            />
            <Button
              shape="circle"
              icon="right"
              onClick={this.onNextClick}
            />
          </div>
        </div>
        <div className="txn__content">
          {
            children
          }
        </div>
      </div>
    );
  }
}

export default Txn;
