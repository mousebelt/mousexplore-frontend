import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { mapKeys, camelCase } from 'lodash';

import { connectSettings } from 'core';
import List from 'components/List/List';
import OperationTable from 'components/Operations/OperationTable';

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
      params: { count: 10}
    })
    .then(res => {
      if (res.data.status !== 200)
        return ;

      let operations = res.data.data.result;
      
      operations = operations.map(operation => {
        operation.time = operation.created_at;

        return mapKeys(operation, (v, k) => camelCase(k));
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
    // return (
    //   <List
    //     className="latest-operations"
    //     icon={<i className="fa fa-link"/>}
    //     title="Operations"
    //     linkToAll="#"
    //     data={this.state.operations}
    //     renderItem={this._renderOperation}
    //   />
    // );
    return (
      <OperationTable
        records={this.state.operations}
        parentRenderTimestamp={Date.now()}
        compact={false}
      />
    )
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LatestOperations);