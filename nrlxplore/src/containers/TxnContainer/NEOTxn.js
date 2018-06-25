import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';

import Txn from 'components/Txn/Txn';
import Spinner from 'components/Spinner/Spinner';


class NEOTxn extends PureComponent {

  state = {
    txn: undefined,
    isLoading: false
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

        this.setState({ txn: txn });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
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

export default compose(
  connectSettings(mapStateToProps, {}),
  withRouter
)(NEOTxn);
