import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';
import BTCTxn from './BTCTxn';
import LTCTxn from './LTCTxn';

import Txn from 'components/Txn/Txn';
import NotFound from 'components/NotFound/NotFound';

class TxnContainer extends PureComponent {

  state = {
    txn: undefined
  };

  componentDidMount() {
    const { apiObject, currency, match } = this.props;

    const { txnHash } = match.params;

    if (txnHash) {
      this.getTxn(apiObject, currency, txnHash);    
    }
  }

  componentWillReceiveProps (newProps) {
    const { apiObject, currency, match } = newProps;

    const { txnHash } = match.params;

    if (txnHash) {
      this.getTxn(apiObject, currency, txnHash);    
    }
  }

  getTxn (apiObject, currency, txnHash) {
    this.setState({
      txn: undefined
    });

    apiObject.get(`/txdetails/${txnHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }
        let txn = res.data.data;

        txn = formatTxnData(txn, currency);

        this.setState({ txn: txn });
      })
  }
  
  _renderDetail = (txnDetail, currency) => {
    if (!txnDetail) {
      return <p>No content...</p>
    }

    let vins = [], vouts = [];

    if (currency === 'BTC' || currency === 'LTC') {
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
    } else if (currency === 'NEO') {
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
    }

    return (
      <div className="txn-detail txn-btc">
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
                        <Link className="item-address" to={`/${currency.toLowerCase()}/address/${item.address}`}>
                          {item.address}
                        </Link>
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
                  <Link className="item-address" to={`/${currency.toLowerCase()}/address/${item.address}`}>
                    {item.address}
                  </Link>
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
          <Link className="value" to={`/${currency.toLowerCase()}/block/${txnDetail.blockHash}`}>
            {txnDetail.blockHash}
          </Link>
        </div>
      </div>
    );
  }

  _renderETH = (txnDetail) => {
    if (!txnDetail) {
      return <p>No content...</p>
    }

    return (
      <div className="txn-detail txn-eth">
        <div className="status">
          <span className="label">
            TxReceipt Status:&nbsp;
          </span>
          <span className={`value success`}>Success</span>
          {/* <span className={`value ${txnDetail.confirmations > 1 ? 'success' : 'failure'}`}>
            {txnDetail.confirmations > 1 ? 'Success' : 'Failed'}
          </span> */}
        </div>
        <div className="to">
          <span className="label">To:</span>
          <Link className="value" to={`/eth/address/${txnDetail.to}`}>{txnDetail.to}</Link>
        </div>
        <div className="from">
          <span className="label">From:</span>
          <Link className="value" to={`/eth/address/${txnDetail.from}`}>{txnDetail.from}</Link>
        </div>
        <div className="amount">
          <span className="label">
            Amount:
          </span>
          <span className="value">{txnDetail.value} ETH</span>
        </div>
        <div className="gas-limit">
          <span className="label">Gas:</span>
          <span className="value">{txnDetail.gas}</span>
        </div>
        <div className="gas-price">
          <span className="label">Gas Price:</span>
          <span className="value">{txnDetail.gasPrice} Gwei</span>
        </div>
        <div className="fee">
          <span className="label">Fee:</span>
          <span className="value">{txnDetail.fee / Math.pow(10, 16)} ETH</span>
        </div>
        <div className="time">
          <span className="label">
            Included In Block:&nbsp; 
          </span>
          <span className="value">
            Sent on {moment.unix(txnDetail.block.timestamp).format('lll')} ({moment.unix(txnDetail.block.timestamp).fromNow()})
          </span>
        </div>
        <div className="block-hash">
          <span className="label">Block Hash:</span>
          <Link className="value" to={`/eth/block/${txnDetail.blockHash}`}>{txnDetail.blockHash}</Link>
        </div>
      </div>
    );
  }

  render() {
    const { currency } = this.props;
    const { txn } = this.state;
    return (
      <div className="txn-container">
        {
          currency === 'BTC' && <BTCTxn/>
        }
        {
          currency === 'LTC' && <LTCTxn/>
        }
        {/* {
          txn ? (
            <Txn
              currency={currency}
              txnHash={this.state.txn.hash}
            >
              {
                currency === 'ETH' ? this._renderETH(txn) : this._renderDetail(txn, currency)
              }
            </Txn>
          ) : (
            <NotFound/>
          )
        } */}
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(TxnContainer);
