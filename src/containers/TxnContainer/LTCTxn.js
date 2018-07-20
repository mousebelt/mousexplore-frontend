import React, { PureComponent } from 'react';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';

import Txn from 'components/Txn/Txn';
import NotFound from 'components/NotFound/NotFound';
import HashLink  from 'components/HashLink/HashLink';

class LTCTxn extends PureComponent {

  state = {
    txn: undefined,
    isLoading: false
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency, txnHash } = this.props;

    if (txnHash) {
      this.getTxn(apiObject, currency, txnHash);
    }
  }

  componentWillReceiveProps({ apiObject, currency, txnHash }) {
    if (txnHash && txnHash !== this.props.txnHash) {
      this.getTxn(apiObject, currency, txnHash);
    }
  }
 
  componentWillUnmount() {
    this._isMounted = false;
  }

  getTxn (apiObject, currency, txnHash) {
    this.setState({
      txn: undefined,
      isLoading: true
    });

    apiObject.get(`/txdetails/${txnHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }
        let txn = res.data.data;

        txn = formatTxnData(txn, currency);

        if (this._isMounted)
          this.setState({ txn });
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoading: false })
      });
  }
  
  _renderDetail = (txnDetail, currency) => {
    if (!txnDetail) {
      return <NotFound/>
    }

    let vins = [], vouts = [];

    vins = txnDetail.vin.map(vin => {
      if (vin.address)
        return {
          value: vin.address.value,
          address: vin.address.scriptPubKey.addresses[0],
          isCoinbase: false
        };
      else if (vin.coinbase)
        return {
          sequence: vin.sequence,
          coinbase: vin.coinbase,
          isCoinbase: true,         
        }
      else
        return null;
    });

    vouts = txnDetail.vout.map(vout => {
      return {
        value: vout.value,
        address: (vout.scriptPubKey.addresses && vout.scriptPubKey.addresses.length) ?
          vout.scriptPubKey.addresses[0] : 'n/a'
      };
    });  

    return (
      <div className="txn-detail txn-ltc">
        <div className="status">
          <span className="label">
            TxReceipt Status:&nbsp;
          </span>
          <span className={`value ${txnDetail.confirmations > 0 ? 'success' : 'failure'}`}>
            {txnDetail.confirmations > 0 ? 'Success' : 'Failed'}
          </span>
        </div>
        <div className="input-output">
          <div className="input">
            <h5>Input:</h5>
            {
              vins.map((item, index) => {
                if (item) {
                  if (!item.isCoinbase) 
                    return (
                      <p className="item" key={index}>
                        <HashLink className="item-address" hash={item.address} type="address">
                          {item.address}
                        </HashLink>
                        <span className="item-value">{item.value} {currency}</span>
                      </p>
                    );
                  else
                    return (
                      <p className="coinbase" key={index}>
                        Coinbase Transaction
                      </p>
                    )
                } else {
                  return null;
                }
              })
            }
          </div>
          <div className="output">
            <h5>Output:</h5>
            {
              vouts.map((item, index) => (
                <p className="item" key={index}>
                  <HashLink className="item-address" hash={item.address} type="address">
                    {item.address}
                  </HashLink>
                  <span className="item-value">{item.value} {currency}</span>
                </p>
              ))
            }
          </div>
        </div>
        <div className="time">
          <span className="label">
            Included In Blocks:&nbsp; 
          </span>
          <span className="value">
            Sent on {moment.unix(txnDetail.timestamp).format('lll')} ({moment.unix(txnDetail.timestamp).fromNow()})
          </span>
        </div>
        <div className="conformation">
          <span className="label">
            Confirmations:&nbsp;
          </span>
          <span className="value">{txnDetail.confirmations || "0 (Unconfirmed)"}</span>
        </div>
        <div className="block-hash">
          <span className="label">Block Hash:</span>
          {
            txnDetail.blockHash ? 
              <HashLink className="value" hash={txnDetail.blockHash} type="block">
                <span>{txnDetail.blockHash}</span>
              </HashLink>
              :
              <span className="value failure">
                Unconfirmed
              </span>
          }
        </div>
      </div>
    );
  }

  render() {
    const { currency, txnHash } = this.props;

    if (currency !== 'LTC') return null;

    const { txn, isLoading } = this.state;

    return (
      <Txn
        currency={currency}
        txnHash={txnHash}
        isLoading={isLoading}
      >
        {
          this._renderDetail(txn, currency)
        }
      </Txn>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LTCTxn);
