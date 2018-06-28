import React, { PureComponent } from 'react';
import { connectSettings, formatTxnData } from 'core';
import { find } from 'lodash';

import Address from 'components/Address/Address';

class XLMAddress extends PureComponent {
  state = {
    address: undefined,
    balance: undefined,
    totalTxns: undefined,
    txnHistory: [],
    tokenBalances: undefined,
    cursor: undefined
  };

  componentDidMount() {
    const { apiObject, currency, address } = this.props;

    if (address) {                            
      this.getAddressInfo(apiObject, currency, address);
    }
  }

  getAddressInfo (apiObject, currency, address) {
    this.setState({address});

    apiObject.get(`/balance/${address}`)
      .then(res => {
        if (res.data.status !== 200) return;

        let tokenBalances = res.data.data;

        tokenBalances = tokenBalances.map(({ asset_code, balance, asset_type }) =>({
          symbol: (asset_type === 'native') ? 'XLM' : asset_code,
          balance: balance
        }));

        const balanceObj = find(tokenBalances, { symbol: currency });
        
        this.setState({
          balance: balanceObj.balance,
          tokenBalances
        });
      })
    this.getAddressTxns(apiObject, currency, address)
  }

  getAddressTxns (apiObject, currency, address) {
    
    const { cursor, txnHistory } = this.state;

    apiObject.get(`/address/txs/${address}`, {
      params: {
        cursor: cursor
      }
    })
      .then(res => {
        if (res.data.status !== 200)
          return;

        let { result: newTxns, next: cursor } = res.data.data;

        newTxns = newTxns.map(txn => {
          return formatTxnData(txn, currency);
        })

        this.setState({
          cursor,
          txnHistory: txnHistory.concat(newTxns)
        });
      })
  }

  handleViewMore = () => {
    const { apiObject, currency, address } = this.props;

    if (address) {
      this.getAddressTxns(apiObject, currency, address);    
    }
  }

  render () {
    const { currency } = this.props;
    const { address, balance, txnHistory, totalTxns, tokenBalances } = this.state;
    return (
      <Address
        currency={currency}
        address={address}
        balance={balance}
        txnHistory={txnHistory}
        totalTxns={totalTxns}
        tokenBalances={tokenBalances}
        onViewMore={this.handleViewMore}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});


export default connectSettings(mapStateToProps, {})(XLMAddress);