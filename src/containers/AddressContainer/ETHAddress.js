import React, { PureComponent } from 'react';
import { connectSettings } from 'core';
import { find } from 'lodash';

import Address from 'components/Address/Address';

class ETHAddress extends PureComponent {
  state = {
    address: undefined,
    balance: undefined,
    totalTxns: undefined,
    txnHistory: [],
    tokenBalances: undefined
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency, address } = this.props;

    if (address) {                            
      this.getAddressInfo(apiObject, currency, address);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getAddressInfo (apiObject, currency, address) {
    this.setState({address});

    apiObject.get(`/balance/${address}`)
      .then(res => {
        if (res.data.status !== 200 || !this._isMounted)
          return;

        const tokenBalances = res.data.data.balances;
        const balanceObj = find(tokenBalances, { symbol: currency });
        
        this.setState({
          balance: balanceObj.balance,
          tokenBalances
        });
      })
    this.getAddressTxns(apiObject, currency, address)
  }

  getAddressTxns (apiObject, currency, address) {
    
    const { txnHistory } = this.state;

    apiObject.get(`/address/txs/${address}`, {
      params: {
        offset: txnHistory.length
      }
    })
      .then(res => {
        if (res.data.status !== 200 || !this._isMounted)
          return;

        let { total: totalTxns, result: newTxns } = res.data.data;

        newTxns = newTxns.map(txn => {
          return {
            hash: txn.hash,
            value: (+txn.value) / Math.pow(10, 18) * (txn.from === address ? -1 : 1),
            blockHash: txn.blockHash,
            timestamp: txn.timestamp
          };
        })

        this.setState({
          totalTxns, 
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


export default connectSettings(mapStateToProps, {})(ETHAddress);