import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
    let { currency } = this.props;

    currency = currency.toLowerCase();
    
    return (
      <div className="ledger">
        <i className="fa fa-cube icon"/>
        <div className="detail">
          <div className="height">
            <Link to={`/${currency}/ledger/${ledger.height}`}>
              #{ledger.height}
            </Link>
          </div>
          <div className="hash">
            <Link to={`/${currency}/ledger/${ledger.height}`}>
              {ledger.hash}
            </Link>
          </div>
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/> {
            currency === 'xlm' ? moment(ledger.timestamp).fromNow() : moment.unix(ledger.timestamp).fromNow()
          }
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