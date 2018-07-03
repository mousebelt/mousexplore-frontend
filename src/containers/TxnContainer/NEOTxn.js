import React, { PureComponent } from 'react';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';

import Txn from 'components/Txn/Txn';
import Spinner from 'components/Spinner/Spinner';
import HashLink  from 'components/HashLink/HashLink';


class NEOTxn extends PureComponent {

  state = {
    txn: undefined,
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency, txnHash } = this.props;

    if (txnHash) {
      this.getTxn(apiObject, currency, txnHash);    
    }
  }
 
  componentWillUnmount() {
    this._isMounted = false;
  }

  getTxn (apiObject, currency, txnHash) {
    this.setState({
      txn: undefined,
    });

    apiObject.get(`/txdetails/${txnHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }
        let txn = res.data.data;

        txn = formatTxnData(txn, currency);

        if (this._isMounted)
          this.setState({ txn: txn });
      })
  }
  
  _renderDetail = (txnDetail, currency) => {
    if (!txnDetail) {
      return <p>No content...</p>
    }

    let vins = [], vouts = [];

    vins = txnDetail.vin.map(vin => {
      return {
        value: vin.address.value,
        address: vin.address.address,
      };
    });

    vouts = txnDetail.vout.map(vout => {
      return {
        value: vout.value,
        address: vout.address,
      };
    });

    return (
      <div className="txn-detail txn-neo">
        <div className="status">
          <span className="label">
            TxReceipt Status:&nbsp;
          </span>
          <span className={`value ${txnDetail.confirmations > 1 ? 'success' : 'failure'}`}>
            {txnDetail.confirmations > 1 ? 'Success' : 'Failed'}
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
          <span className="value">{txnDetail.confirmations}</span>
        </div>
        <div className="block-hash">
          <span className="label">Block Hash:</span>
          <HashLink className="value" hash={txnDetail.blockHash} type="block">
            {txnDetail.blockHash}
          </HashLink>
        </div>
      </div>
    );
  }

  render() {
    const { currency } = this.props;

    if (currency !== 'NEO') return null;

    const { txn } = this.state;

    if (txn) {
      return (
        <Txn
          currency={currency}
          txnHash={this.state.txn.hash}
        >
          {
            this._renderDetail(txn, currency)
          }
        </Txn>
      );
    } else {
      return <Spinner/>;
    }
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(NEOTxn);
