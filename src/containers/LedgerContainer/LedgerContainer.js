import React, { PureComponent } from 'react';
import Ledger from 'components/Ledger/Ledger';
import { connectSettings, formatBlockData, formatTxnData } from 'core';

class LedgerContainer extends PureComponent {
  state = {
    ledger: undefined,
    txns: [],
    isLoadingLedger: false,
    isLoadingTxns: false,
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency, match } = this.props;

    const { ledgerHash } = match.params;

    if (ledgerHash) {
      this.getLedger(apiObject, currency, ledgerHash);    
    }
  }

  componentWillReceiveProps(newProps) {
    const { apiObject, currency, match } = newProps;

    const { ledgerHash } = match.params;

    if (ledgerHash) {
      this.getLedger(apiObject, currency, ledgerHash);    
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getLedger(apiObject, currency, ledgerHash) {
    this.setState({
      ledger: undefined,
      txns: [],
      isLoadingLedger: true,
      isLoadingTxns: true,
    });

    apiObject.get(`/ledger/${ledgerHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }
        let ledger = res.data.data;
        
        ledger = formatBlockData(ledger, currency);

        if (this._isMounted)
          this.setState({ ledger });
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoadingLedger: false })
      });

    apiObject.get(`/ledger/txs/${ledgerHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }

        let txns = res.data.data.result;

        txns = txns.map(txn => formatTxnData(txn, currency));
        
        if (this._isMounted)
          this.setState({txns});
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoadingTxns: false })
      });
  }
  
  render () {
    const { currency } = this.props;
    const { ledger, txns, isLoadingLedger, isLoadingTxns } = this.state;
    
    return (
      <div className="ledger-container">
        <Ledger
          currency={currency}
          ledger={ledger}
          txns={txns}
          isLoadingLedger={isLoadingLedger}
          isLoadingTxns={isLoadingTxns}
        />
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LedgerContainer);