import React, { PureComponent } from 'react';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';
import { camelCase, mapKeys } from 'lodash';

import Txn from 'components/Txn/Txn';
import OperationTable from 'components/Operations/OperationTable';
import Spinner from 'components/Spinner/Spinner';
import HashLink  from 'components/HashLink/HashLink';

class XLMTxn extends PureComponent {

  state = {
    txn: undefined,
    isLoading: false,
    operations: []
  };

  componentDidMount() {
    const { apiObject, currency, txnHash } = this.props;

    if (txnHash) {
      this.getTxn(apiObject, currency, txnHash);
      this.getOperations(apiObject, currency, txnHash);
    }
  }

  getTxn (apiObject, currency, txnHash) {
    this.setState({
      txn: undefined,
      isLoading: true
    });

    apiObject.get(`/tx/${txnHash}`)
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

  getOperations(apiObject, currency, txnHash) {
    this.setState({
      opeartions: [],
      isLoading: true
    });

    apiObject.get(`/tx/operations/${txnHash}`)
      .then(res => {
        if (res.data.status !== 200) return;

        let operations = res.data.data.result;
        operations = operations.map(operation => {
          operation.time=operation.created_at;
          return mapKeys(operation, (v, k) => camelCase(k))
        });

        this.setState({
          operations,
          isLoading: false
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
  }

  _renderDetail = (txnDetail, currency) => {
    if (!txnDetail) {
      return <p>No content...</p>
    }

    return (
      <div className="txn-detail txn-xlm">
        <div className="status">
          <span className="label">TxReceipt Status:</span>
          <span className='value success'>Success</span>
        </div>
        <div className="account">
          <span className="label">Account:</span>
          <HashLink className="value" hash={txnDetail.account} type="address">
            {txnDetail.account}
          </HashLink>
        </div>
        <div className="operation-count">
          <span className="label">Operations:</span>
          <span className="value">{txnDetail.opCount}</span>
        </div>
        <div className="fee">
          <span className="label">Fee:</span>
          <span className="value">{txnDetail.fee_paid} Stroops</span>
        </div>
        <div className="time">
          <span className="label">Included In Blocks:</span>
          <span className="value">
            Sent on {moment(txnDetail.timestamp).format('lll')} ({moment(txnDetail.timestamp).fromNow()})
          </span>
        </div>
        <div className="block-hash">
          <span className="label">Ledger Sequence:</span>
          <HashLink className="value" hash={txnDetail.ledger_attr} type="ledger">
            {txnDetail.ledger_attr}
          </HashLink>
        </div>
      </div>
    );
  }

  _renderOperations = () => {

  }

  render() {
    const { currency } = this.props;

    if (currency !== 'XLM') return null;

    const { txn, operations } = this.state;

    if (txn) {
      return (
        <div>
          <Txn
            currency={currency}
            txnHash={this.state.txn.hash}
          >
            {
              this._renderDetail(txn, currency)
            }
          </Txn>
          <OperationTable
            compact={false}
            parentRenderTimestamp={Date.now()}
            records={operations}
          />
        </div>
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

export default connectSettings(mapStateToProps, {})(XLMTxn);
