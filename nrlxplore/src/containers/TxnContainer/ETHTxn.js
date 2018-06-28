import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';

import Txn from 'components/Txn/Txn';
import Spinner from 'components/Spinner/Spinner';


class ETHTxn extends PureComponent {

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
  
  _renderDetail = (txnDetail) => {
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
          <span className="value">{txnDetail.value / Math.pow(10, 18)} ETH</span>
        </div>
        <div className="gas-limit">
          <span className="label">Gas:</span>
          <span className="value">{txnDetail.gas}</span>
        </div>
        <div className="gas-price">
          <span className="label">Gas Price:</span>
          <span className="value">{txnDetail.gasPrice / Math.pow(10, 9)} Gwei</span>
        </div>
        <div className="fee">
          <span className="label">Fee:</span>
          <span className="value">{txnDetail.fee / Math.pow(10, 18)} ETH</span>
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

    if (currency !== 'ETH') return null;

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
)(ETHTxn);
