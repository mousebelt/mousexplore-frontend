import React, { PureComponent } from 'react';
import { mapKeys, camelCase } from 'lodash';
import { connectSettings } from 'core';
import OperationTable from 'components/Operations/OperationTable';

class LatestOperations extends PureComponent {
  state = {
    operations: []
  };

  componentDidMount() {
    this._isMounted = true;

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

  componentWillUnmount() {
    this._isMounted = false;
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

      if (this._isMounted)
        this.setState({ operations });
    });
  }

  render() {
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