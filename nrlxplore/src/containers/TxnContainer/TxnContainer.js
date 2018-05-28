import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import BTCTxn from './BTCTxn/BTCTxn';
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

  render() {
    const { currency } = this.props;
    return (
      <div className="txn-container">
        { currency === "BTC" && 
          <BTCTxn
            currency={currency}

          />
        }
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(TxnContainer);
