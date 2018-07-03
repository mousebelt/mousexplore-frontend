import React, { PureComponent } from 'react';
import Ledger from 'components/Ledger/Ledger';
import NotFound from 'components/NotFound/NotFound';
import { connectSettings, formatBlockData, formatTxnData } from 'core';

class LedgerContainer extends PureComponent {
  state = {
    ledger: undefined,
    txns: []
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
      txns: []
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
      });

    apiObject.get(`/ledger/txs/${ledgerHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }

        let txns = res.data.data.result;

        txns = txns.map(txn => {
          return formatTxnData(txn, currency);
        });
        
        if (this._isMounted)
          this.setState({txns});
      });
  }
  
  render () {
    const { currency } = this.props;
    const { ledger, txns } = this.state;
    
    return (
      <div className="ledger-container">
        {
          ledger ? (
            <Ledger
              currency={currency}
              ledger={ledger}
              txns={txns}
            />
          ) : (
            <NotFound/>
          )
        }
        
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LedgerContainer);