import React, { PureComponent } from 'react'; 
import { Link } from 'react-router-dom';
import { connectSettings, formatTxnData } from 'core';

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
          <div className="block-hash">
            Block: &nbsp;
            <Link to={`/${currency}/block/${transaction.blockHash}`}>
              {transaction.blockHash}
            </Link>
          </div>
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/> {transaction.timestamp || 'n/a'}
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