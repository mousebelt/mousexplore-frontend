import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import BTCTxn from './BTCTxn';
import LTCTxn from './LTCTxn';
import ETHTxn from './ETHTxn';
import NEOTxn from './NEOTxn';
import XLMTxn from './XLMTxn';

class TxnContainer extends PureComponent {
  render() {
    const { currency } = this.props;
    return (
      <div className="txn-container">
        {
          currency === 'BTC' && <BTCTxn/>
        }
        {
          currency === 'LTC' && <LTCTxn/>
        }
        {
          currency === 'ETH' && <ETHTxn/>
        }
        {
          currency === 'NEO' && <NEOTxn/>
        }
        {
          currency === 'XLM' && <XLMTxn/>
        }
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(TxnContainer);
