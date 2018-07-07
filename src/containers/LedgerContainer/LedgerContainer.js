import React, { PureComponent } from 'react';
import Ledger from 'components/Ledger/Ledger';
import { connectSettings, formatBlockData, formatTxnData } from 'core';

class LedgerContainer extends PureComponent {
  state = {
    ledgerHash: undefined,
    ledger: undefined,
    txns: [],
    isLoadingLedger: false,
    isLoadingTxns: false,
    hasMoreTxns: false,
    cursor: undefined,
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency, match } = this.props;

    const { ledgerHash } = match.params;

    if (ledgerHash) {
      this.getLedger(apiObject, currency, ledgerHash);
      this.getLedgerTxns(apiObject, currency, ledgerHash);
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
      ledgerHash: ledgerHash,
      ledger: undefined,
      isLoadingLedger: true,
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
  }

  getLedgerTxns = (apiObject, currency, ledgerHash) => {
    this.setState({
      isLoadingTxns: true,
    });

    const { cursor, txns } = this.state;

    apiObject.get(`/ledger/txs/${ledgerHash}`, {
      params: { cursor }
    })
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }

        let { result: newTxns, next: cursor } = res.data.data;

        newTxns = newTxns.map(txn => formatTxnData(txn, currency));

        const hasMoreTxns = newTxns.length < 10 ? false : true;
        
        if (this._isMounted)
          this.setState({
            cursor,
            txns: txns.concat(newTxns),
            hasMoreTxns,
          });
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoadingTxns: false })
      });
  }

  handleViewMore = () => {
    const { apiObject, currency } = this.props;
    const { ledgerHash } = this.state;

    if (ledgerHash) {
      this.getLedgerTxns(apiObject, currency, ledgerHash);    
    }
  }
  
  render () {
    const { currency } = this.props;
    const { ledger, txns, isLoadingLedger, isLoadingTxns, hasMoreTxns } = this.state;
    
    return (
      <div className="ledger-container">
        <Ledger
          currency={currency}
          ledger={ledger}
          txns={txns}
          isLoadingLedger={isLoadingLedger}
          isLoadingTxns={isLoadingTxns}
          hasMoreTxns={hasMoreTxns}
          onViewMore={this.handleViewMore}
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