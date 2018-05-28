import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import Txn from 'components/Txn/Txn';
// import BTCTxn from './BTCTxn/BTCTxn';
// import BTCTxn from './BTCTxn/BTCTxn';
// import BTCTxn from './BTCTxn/BTCTxn';
// import BTCTxn from './BTCTxn/BTCTxn';

class TxnContainer extends PureComponent {
  _renderBTC = (txnDetail) => {
    return (
      <div className="txn-btc"></div>
    );
  }

  _renderTxn = () => {
    
  }

  render() {
    const { currency } = this.props;
    return (
      <div className="txn-container">
        <Txn>
          { currency }
        </Txn>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(TxnContainer);
