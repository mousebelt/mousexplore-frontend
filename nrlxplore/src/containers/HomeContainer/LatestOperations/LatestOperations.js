import React, { PureComponent } from 'react';
import List from 'components/List/List';
import { connectSettings } from 'core';
import moment from 'moment';

import { Link } from 'react-router-dom';

const mockOperations = [
  {   
    "operation": "8febfdb00d2920f65af42d4f28d118742a95b0f3ea134ebd980cf302e7818317",
    "account": "GARMAQQ45FYTFSCLBREX5M3JTTBZ5MWDMU5DOGZRHXU6SG2GX4CB7IAF",
    "type": "payment",
    "asset_type": 'credit_alphanum12',
      "asset_code": 'nCntGameCoin',
      "asset_issuer": 'GDLMDXI6EVVUIXWRU4S2YVZRMELHUEX3WKOX6XFW77QQC6KZJ4CZ7NRB',
      "from": 'GAK3NSB43EVCZKDH4PYGJPCVPOYZ7X7KIR3ZTWSYRKRMJWGG5TABM6TH',
      "to": 'GCHKKQ5VWJBRQZHNMODO5BWYZKPNM2HDSJ26T4O644CNEQBYK7IXATKM',
      "amount": '2.0000000',
    "timeStamp": "2015-09-24T10:07:09Z",
  },
  {   
    "operation": "8febfdb00d2920f65af42d4f28d118742a95b0f3ea134ebd980cf302e7818317",
    "account": "GARMAQQ45FYTFSCLBREX5M3JTTBZ5MWDMU5DOGZRHXU6SG2GX4CB7IAF",
    "type": "payment",
    "asset_type": 'credit_alphanum12',
    "asset_issuer": 'GDLMDXI6EVVUIXWRU4S2YVZRMELHUEX3WKOX6XFW77QQC6KZJ4CZ7NRB',
    "asset_code": 'nCntGameCoin',
      "from": 'GAK3NSB43EVCZKDH4PYGJPCVPOYZ7X7KIR3ZTWSYRKRMJWGG5TABM6TH',
      "to": 'GCHKKQ5VWJBRQZHNMODO5BWYZKPNM2HDSJ26T4O644CNEQBYK7IXATKM',
      "amount": '2.0000000',
    "timeStamp": "2015-09-24T10:07:09Z",
  },
  {   
    "operation": "8febfdb00d2920f65af42d4f28d118742a95b0f3ea134ebd980cf302e7818317",
    "account": "GARMAQQ45FYTFSCLBREX5M3JTTBZ5MWDMU5DOGZRHXU6SG2GX4CB7IAF",
    "type": "payment",
    "asset_type": 'credit_alphanum12',
      "asset_code": 'nCntGameCoin',
      "asset_issuer": 'GDLMDXI6EVVUIXWRU4S2YVZRMELHUEX3WKOX6XFW77QQC6KZJ4CZ7NRB',
      "from": 'GAK3NSB43EVCZKDH4PYGJPCVPOYZ7X7KIR3ZTWSYRKRMJWGG5TABM6TH',
      "to": 'GCHKKQ5VWJBRQZHNMODO5BWYZKPNM2HDSJ26T4O644CNEQBYK7IXATKM',
      "amount": '2.0000000',
    "timeStamp": "2015-09-24T10:07:09Z",
  },
  {   
    "operation": "8febfdb00d2920f65af42d4f28d118742a95b0f3ea134ebd980cf302e7818317",
    "account": "GARMAQQ45FYTFSCLBREX5M3JTTBZ5MWDMU5DOGZRHXU6SG2GX4CB7IAF",
    "type": "payment",
    "asset_type": 'credit_alphanum12',
      "asset_code": 'nCntGameCoin',
      "asset_issuer": 'GDLMDXI6EVVUIXWRU4S2YVZRMELHUEX3WKOX6XFW77QQC6KZJ4CZ7NRB',
      "from": 'GAK3NSB43EVCZKDH4PYGJPCVPOYZ7X7KIR3ZTWSYRKRMJWGG5TABM6TH',
      "to": 'GCHKKQ5VWJBRQZHNMODO5BWYZKPNM2HDSJ26T4O644CNEQBYK7IXATKM',
      "amount": '2.0000000',
    "timeStamp": "2015-09-24T10:07:09Z",
  },
]

class LatestOperations extends PureComponent {
  state = {
    operations: []
  };

  componentDidMount() {
    const { apiObject, currency } = this.props;
    
    this.getLatestOperations(apiObject, currency);
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      operations: []
    });
    
    const { apiObject, currency } = newProps;
    
    this.getLatestOperations(apiObject, currency);
  }

  getLatestOperations (apiObject, currency) {

    if (currency !== 'XLM')
      return;
    
    apiObject.get('/operations', {
      params: { count: 5}
    })
    .then(res => {
      if (res.data.status !== 200)
        return ;

      let operations = res.data.data.result;
      
      operations = operations.map(operation => {
        return {
          id: operation.id,
          txnHash: operation.transaction_hash,
          account: operation.source_account,
          type: operation.type,
          timestamp: operation.created_at
        }
      });

      
      this.setState({ operations });
    });
  }
  
  _renderOperation = (operation) => {
    let { currency } = this.props;

    currency = currency.toLowerCase();

    return (
      <div className="operation">
        <i className="fa fa-link icon"/>
        <div className="detail">
          <div className="id">
            <Link to={`/${currency}/operation/${operation.id}`}>
              #{operation.id}
            </Link>
            &nbsp;({operation.type})
          </div>
          <div className="txn-hash">
            Txn: &nbsp;
            <Link to={`/${currency}/transaction/${operation.txnHash}`}>
              {operation.txnHash}
            </Link>
          </div>
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/> {operation.timestamp ? moment(operation.timestamp).fromNow() : 'n/a'}
        </span>
      </div>
    );
  }

  render() {
    return (
      <List
        className="latest-operations"
        icon={<i className="fa fa-link"/>}
        title="Operations"
        linkToAll="#"
        data={this.state.operations}
        renderItem={this._renderOperation}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LatestOperations);