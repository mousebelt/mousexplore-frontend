import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connectSettings, formatTxnData,  } from 'core';

import Txn from 'components/Txn/Txn';
import NotFound from 'components/NotFound/NotFound';

class TxnContainer extends PureComponent {

  state = {
    txn: undefined
  };

  componentDidMount() {
    const { apiObject, currency, match } = this.props;

    const { txnHash } = match.params;

    console.log(txnHash);

    if (txnHash) {
      this.getTxn(apiObject, currency, txnHash);    
    }
  }

  componentWillReceiveProps (newProps) {
    const { apiObject, currency, match } = newProps;

    const { txnHash } = match.params;

    console.log(txnHash);

    if (txnHash) {
      this.getTxn(apiObject, currency, txnHash);    
    }
  }

  getTxn (apiObject, currency, txnHash) {
    this.setState({
      txn: undefined
    });

    console.log('------------');
    apiObject.get(`/txdetails/${txnHash}`)
      .then(res => {
        console.log(res);
        if (res.data.status !== 200) {
          return;
        }
        let txn = res.data.data;

        txn = formatTxnData(txn, currency);

        this.setState({ txn: txn });
      })
  }
  
  _renderBTC = (txnDetail) => {
    if (!txnDetail) {
      return <p>No content...</p>
    }

    const vins = txnDetail.vin.map(vin => {
      return {
        value: vin.address.value,
        address: vin.address.scriptPubKey.addresses[0]
      };
    });

    const vouts = txnDetail.vout.map(vout => {
      return {
        value: vout.value,
        address: vout.scriptPubKey.addresses[0]
      };
    })

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
              vins.map((item, index) => (
                <p className="item" key={index}>
                  <Link className="item-address" to={`/btc/address/${item.address}`}>{item.address}</Link>
                  <span className="item-value">{item.value} BTC</span>
                </p>
              ))
            }
          </div>
          <div className="output">
            <h5>Output:</h5>
            {
              vouts.map((item, index) => (
                <p className="item" key={index}>
                  <Link className="item-address" to={`/btc/address/${item.address}`}>{item.address}</Link>
                  <span className="item-value">{item.value} BTC</span>
                </p>
              ))
            }
          </div>
        </div>
        <div className="time">
          <span className="label">
            Included In Txns:&nbsp; 
          </span>
          <span className="value">
            Sent on {moment.unix(txnDetail.timestamp).format('lll')} ({moment(txnDetail.timestamp).fromNow()})
          </span>
        </div>
        <div className="conformation">
          <span className="label">
            Confirmations:&nbsp;
          </span>
          <span className="value">{txnDetail.confirmations}</span>
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
          txn ? (
            <Txn
              currency={currency}
              txnHash={this.state.txn.hash}
            >
              {
                this._renderBTC(txn)
              }
            </Txn>
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

export default connectSettings(mapStateToProps, {})(TxnContainer);
