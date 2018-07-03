import React, { PureComponent } from 'react';
import moment from 'moment';
import HashLink from 'components/HashLink/HashLink';

import List from 'components/List/List';
import { connectSettings } from 'core';
import { formatBlockData } from 'core/utils';

class LatestLedgers extends PureComponent {
  state = {
    ledgers: []
  };

  componentDidMount() {
    const { apiObject, currency } = this.props;
    
    this.getLatestLedgers(apiObject, currency);
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      ledgers: []
    });
    
    const { apiObject, currency } = newProps;
    
    this.getLatestLedgers(apiObject, currency);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getLatestLedgers (apiObject, currency) {
    
    apiObject.get('/ledgers', {
      params: { count: 5}
    })
    .then(res => {
      let ledgers = res.data.data.result;
      
      ledgers = ledgers.map(ledger => {
        return formatBlockData(ledger, currency);
      });

      this.setState({ ledgers });
    });
  }

  _renderLedger = (ledger) => {
    return (
      <div className="ledger">
        <i className="fa fa-cube icon"/>
        <div className="detail">
          <div className="height">
            <HashLink hash={ledger.height} type="ledger">
              #{ledger.height}
            </HashLink>
          </div>
          <div className="hash">
            <HashLink hash={ledger.height} type="ledger">
              {ledger.hash}
            </HashLink>
          </div>
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/> {moment(ledger.timestamp).fromNow()}
        </span>
      </div>
    );
  }

  render() {
    return (
      <List
        className="latest-ledgers"
        icon={<i className="fa fa-cubes"/>}
        title="Ledgers"
        linkToAll="#"
        data={this.state.ledgers}
        renderItem={this._renderLedger}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LatestLedgers);