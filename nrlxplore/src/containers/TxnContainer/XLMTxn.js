import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';

import Txn from 'components/Txn/Txn';
import Spinner from 'components/Spinner/Spinner';


class XLMTxn extends PureComponent {

  state = {
    txn: undefined,
    isLoading: false,
    operations: []
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

  getOperations() {

  }

  render() {
    // const { currency } = this.props;

    // if (currency !== 'XLM') return null;

    // const { txn } = this.state;

    // if (txn) {
    //   return (
    //     <Txn
    //       currency={currency}
    //       txnHash={this.state.txn.hash}
    //     >
    //       {
    //         this._renderDetail(txn, currency)
    //       }
    //     </Txn>
    //   );
    // } else {
    //   return <Spinner/>;
    // }

    return (
      <div>Transaction Detail</div>
    )
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default compose(
  connectSettings(mapStateToProps, {}),
  withRouter
)(XLMTxn);
