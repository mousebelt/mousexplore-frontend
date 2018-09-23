import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import BTCTxn from './BTCTxn';
import LTCTxn from './LTCTxn';
import ETHTxn from './ETHTxn';
import NEOTxn from './NEOTxn';
import XLMTxn from './XLMTxn';
import WANTxn from './WANTxn';

const TxnComponentMap = {
  BTC: BTCTxn,
  LTC: LTCTxn,
  ETH: ETHTxn,
  NEO: NEOTxn,
  XLM: XLMTxn,
  WAN: WANTxn
}

class TxnContainer extends PureComponent {
  render() {
    const { currency, match } = this.props;

    const TxnComponent = TxnComponentMap[currency] || null;

    return (
      <div className="txn-container">
        <TxnComponent txnHash={match.params.txnHash}/>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(TxnContainer);
