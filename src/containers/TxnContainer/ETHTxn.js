import React, { PureComponent } from 'react';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';

import Txn from 'components/Txn/Txn';
import NotFound from 'components/NotFound/NotFound';
import HashLink  from 'components/HashLink/HashLink';

class ETHTxn extends PureComponent {

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
          this.setState({ txn: txn });
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoading: false })
      });
  }
  
  _renderDetail = (txnDetail) => {
    if (!txnDetail) {
      return <NotFound/>
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
          <HashLink className="value" hash={txnDetail.to} type="address">{txnDetail.to}</HashLink>
        </div>
        <div className="from">
          <span className="label">From:</span>
          <HashLink className="value" hash={txnDetail.from} type="address">{txnDetail.from}</HashLink>
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
          <HashLink className="value" hash={txnDetail.blockHash} type="block">{txnDetail.blockHash}</HashLink>
        </div>
      </div>
    );
  }

  render() {
    const { currency, txnHash } = this.props;

    if (currency !== 'ETH') return null;

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

export default connectSettings(mapStateToProps, {})(ETHTxn);
