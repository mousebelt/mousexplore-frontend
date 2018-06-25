import React, { PureComponent } from 'react'; 
import { Link } from 'react-router-dom';
import { connectSettings, formatTxnData } from 'core';
import moment from 'moment';

import List from 'components/List/List';

class LatestTransactons extends PureComponent {
  state = {
    txns: []
  };

  componentDidMount() {
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

  getLatestTxns (apiObject, currency) {
    
    apiObject.get('/transactions', {
      params: { count: 5}
    })
    .then(res => {
      if (res.data.status !== 200)
        return ;

      console.log(res);

      let txns = res.data.data.result;
      
      txns = txns.map(txn => {
        return formatTxnData(txn, currency);
      });

      console.log(txns);

      this.setState({ txns });
    });
  }
  
  _renderTransaction = (transaction) => {
    let { currency } = this.props;

    currency = currency.toLowerCase();

    return (
      <div className="transaction">
        <i className="fa fa-credit-card icon"/>
        <div className="detail">
          <div className="hash">
            <Link to={`/${currency}/transaction/${transaction.hash}`}>
              {transaction.hash}
            </Link>
          </div>
          {
            currency === 'xlm' ? (
              <div className="ledger-hash">
                Ledger: &nbsp;
                <Link to={`/${currency}/ledger/${transaction.ledger}`}>
                  #{transaction.ledger}
                </Link>
              </div>
            ) : (
              <div className="block-hash">
                Block: &nbsp;
                <Link to={`/${currency}/block/${transaction.blockHash}`}>
                  {transaction.blockHash}
                </Link>
              </div>
            )
          }
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/>&nbsp;
          {currency === 'xlm' ? moment(transaction.timestamp).fromNow() : moment.unix(transaction.timestamp).fromNow()}
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