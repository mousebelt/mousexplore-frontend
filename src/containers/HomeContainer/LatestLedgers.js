import React, { PureComponent } from 'react';
import moment from 'moment';
import HashLink from 'components/HashLink/HashLink';

import List from 'components/List/List';
import { connectSettings } from 'core';
import { formatBlockData } from 'core/utils';

class LatestLedgers extends PureComponent {
  state = {
    ledgers: [],
    isLoading: false
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency } = this.props;
    
    this.getLatestLedgers(apiObject, currency);
  }

  componentWillReceiveProps (newProps) {
   
    const { apiObject, currency } = newProps;
    
    this.getLatestLedgers(apiObject, currency);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getLatestLedgers (apiObject, currency) {
    this.setState({
      ledgers: [],
      isLoading: true
    })

    apiObject.get('/ledgers', {
      params: { count: 5}
    })
      .then(res => {
        let ledgers = res.data.data.result;
        
        ledgers = ledgers.map(ledger => formatBlockData(ledger, currency));

        if (this._isMounted)
          this.setState({ ledgers });
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoading: false });
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
            <span className="time">
              <i className="fa fa-clock-o"/> {moment(ledger.timestamp).fromNow()}
            </span>
          </div>
          <div className="hash">
            <HashLink hash={ledger.height} type="ledger">
              {ledger.hash}
            </HashLink>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <List
        className="latest-ledgers"
        icon={<i className="fa fa-cubes"/>}
        title="Ledgers"
        data={this.state.ledgers}
        renderItem={this._renderLedger}
        isLoading={this.state.isLoading}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LatestLedgers);