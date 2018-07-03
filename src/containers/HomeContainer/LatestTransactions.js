import React, { PureComponent } from 'react'; 
import moment from 'moment';
import { connectSettings, formatTxnData } from 'core';

import List from 'components/List/List';
import HashLink from 'components/HashLink/HashLink';

class LatestTransactons extends PureComponent {
  state = {
    txns: []
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency } = this.props;
    
    this.getLatestTxns(apiObject, currency);
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      txns: []
    });
    
    const { apiObject, currency } = newProps;
    
    this.getLatestTxns(apiObject, currency);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getLatestTxns (apiObject, currency) {
    
    apiObject.get('/transactions', {
      params: { count: 5 }
    })
    .then(res => {
      if (res.data.status !== 200)
        return ;

      let txns = res.data.data.result;
      
      txns = txns.map(txn => {
        return formatTxnData(txn, currency);
      });

      if (this._isMounted)
        this.setState({ txns });
    });
  }
  
  _renderTransaction = (transaction) => {
    let { currency } = this.props;

    return (
      <div className="transaction">
        <i className="fa fa-credit-card icon"/>
        <div className="detail">
          <div className="hash">
            <HashLink hash={transaction.hash} type="transaction">
              {transaction.hash}
            </HashLink>
          </div>
          {
            currency === 'XLM' ? (
              <div className="ledger-hash">
                Ledger: &nbsp;
                <HashLink hash={transaction.ledger} type="ledger">
                  #{transaction.ledger}
                </HashLink>
              </div>
            ) : (
              <div className="block-hash">
                Block: &nbsp;
                <HashLink hash={transaction.blockHash} type="block">
                  {transaction.blockHash}
                </HashLink>
              </div>
            )
          }
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/>&nbsp;
          {currency === 'XLM' ? moment(transaction.timestamp).fromNow() : moment.unix(transaction.timestamp).fromNow()}
        </span>
      </div>
    );
  }

  render() {
    return (
      <List
        className="latest-transactions"
        icon={<i className="fa fa-credit-card"/>}
        title="Transactions"
        linkToAll="#"
        data={this.state.txns}
        renderItem={this._renderTransaction}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LatestTransactons);