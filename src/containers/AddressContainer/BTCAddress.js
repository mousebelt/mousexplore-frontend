import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import Address from 'components/Address/Address';

class BTCAddress extends PureComponent {
  state = {
    address: undefined,
    balance: undefined,
    totalTxns: undefined,
    txnHistory: [],
    isLoadingBalance: false,
    isLoadingTxns: false,
    hasMoreTxns: true
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency, address } = this.props;

    this.setState({ address });

    if (address) {                            
      this.getAddressInfo(apiObject, currency, address);
      this.getAddressTxns(apiObject, currency, address); 
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getAddressInfo (apiObject, currency, address) {
    this.setState({
      balance: undefined,
      isLoadingBalance: true
    });

    apiObject.get(`/balance/${address}`)
      .then(res => {
        if (res.data.status !== 200)
          return;

        if (this._isMounted)
          this.setState({ balance: res.data.data.balance });
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoadingBalance: false })
      })
  }

  getAddressTxns (apiObject, currency, address) {
    
    const { txnHistory } = this.state;

    this.setState({
      isLoadingTxns: true
    });

    apiObject.get(`/address/txs/${address}`, {
      params: {
        offset: txnHistory.length
      }
    })
      .then(res => {
        if (res.data.status !== 200)
          return;

        let { total: totalTxns, result: newTxns } = res.data.data;
        
        newTxns = newTxns.map(txn => {
          let value = 0;
          
          txn.vin.forEach( vin => {
            if (vin.address && (vin.address.scriptPubKey.addresses[0] === address))
              value -= vin.address.value;
          });

          txn.vout.forEach( vout => {
            if (vout.scriptPubKey.addresses[0] === address)
              value += vout.value;
          });

          return {
            hash: txn.hash,
            blockHash: txn.blockhash,
            timestamp: txn.time,
            value: value
          }
        });

        const hasMoreTxns = newTxns.length < 10 ? false : true;
        
        if (this._isMounted)
          this.setState({
            hasMoreTxns,
            totalTxns, 
            txnHistory: txnHistory.concat(newTxns)
          });
      })
      .finally(() => {
        if (this._isMounted) 
          this.setState({ isLoadingTxns: false });
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
    const { address, balance, txnHistory, totalTxns, isLoadingBalance, isLoadingTxns, hasMoreTxns } = this.state;
    return (
      <Address
        currency={currency}
        address={address}
        balance={balance}
        txnHistory={txnHistory}
        totalTxns={totalTxns}
        isLoadingBalance={isLoadingBalance}
        isLoadingTxns={isLoadingTxns}
        hasMoreTxns={hasMoreTxns}
        onViewMore={this.handleViewMore}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});


export default connectSettings(mapStateToProps, {})(BTCAddress);