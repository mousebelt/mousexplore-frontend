import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import Address from 'components/Address/Address';

class AddressContainer extends PureComponent {
  state = {
    address: undefined,
    balance: undefined,
    totalTxns: undefined,
    txnHistory: []
  };

  componentDidMount() {
    const { apiObject, currency, match } = this.props;

    const { addrHash } = match.params;

    if (addrHash) {                                 
      this.getAddressInfo(apiObject, currency, addrHash);    
    }
  }

  componentWillReceiveProps (newProps) {
    const { apiObject, currency, match } = newProps;

    const { addrHash } = match.params;

    if (addrHash) {
      this.getAddressInfo(apiObject, currency, addrHash);    
    }
  }

  getAddressInfo (apiObject, currency, address) {
    this.setState({address});

    apiObject.get(`/balance/${address}`)
      .then(res => {
        if (res.data.status !== 200) return;

        this.setState({
          balance: res.data.data.balance
        });
      })
    this.getAddressTxns(apiObject, currency, address)
  }

  getAddressTxns (apiObject, currency, address) {
    
    const { txnHistory } = this.state;

    apiObject.get(`/address/txs/${address}`, {
      offset: txnHistory.length
    })
      .then(res => {
        if (res.data.status !== 200)
          return;

        let { total: totalTxns, result: newTxns } = res.data.data;

        if (currency === 'ETH') {
          newTxns = newTxns.map(txn => {
            return {
              hash: txn.hash,
              value: (+txn.value) / Math.pow(10, 18) * (txn.from === address ? -1 : 1),
              blockHash: txn.blockHash,
              timestamp: txn.timestamp
            };
          })
        } else if (currency === 'BTC' | currency === 'LTC') {
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
        } else if (currency === 'NEO') {
          newTxns = newTxns.map(txn => {
            let value = 0;

            txn.vin.forEach( vin => {
              if (vin.address && (vin.address.address === address))
                value -= (+vin.address.value);
            });

            txn.vout.forEach( vout => {
              if (vout.address && (vout.address === address))
                value += (+vout.value);
            });
            
            return {
              hash: txn.txid,
              blockHash: txn.blockhash,
              timestamp: txn.blocktime,
              value: value
            }
          });
        } else {
          newTxns = [];
        }

        this.setState({
          totalTxns, 
          txnHistory: txnHistory.concat(newTxns)
        });
      })
  }

  handleViewMore = () => {
    const { apiObject, currency, match } = this.props;

    const { addrHash } = match.params;

    if (addrHash) {
      this.getAddressTxns(apiObject, currency, addrHash);    
    }
  }

  render () {
    const { currency } = this.props;
    const { address, balance, txnHistory, totalTxns } = this.state;
    return (
      <Address
        currency={currency}
        address={address}
        balance={balance}
        txnHistory={txnHistory}
        totalTxns={totalTxns}
        onViewMore={this.handleViewMore}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});


export default connectSettings(mapStateToProps, {})(AddressContainer);