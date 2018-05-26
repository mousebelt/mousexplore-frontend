 import React, { PureComponent } from 'react';
import List from 'components/List/List';
import { connectSettings } from 'core';
import { Link } from 'react-router-dom';

const mockLedgers = [
  {
    id: 1297315,
    hash: "bdde95e350cf7e4805bd9c44d05566175e7f08847d82f09de3b6d837970b1065",
    timestamp: 'n/a'
  },
  {
    id: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    id: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    id: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    id: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
]

class LatestLedgers extends PureComponent {
  _renderLedger = (ledger) => {
    let { currency } = this.props;

    currency = currency.toLowerCase();
    
    return (
      <div className="ledger">
        <i className="fa fa-file-text-o icon"/>
        <div className="detail">
          <div className="id">
            <Link to={`/${currency}/ledger/${ledger.id}`}>
              #{ledger.id}
            </Link>
          </div>
          <div className="hash">
            <Link to={`/${currency}/ledger/${ledger.hash}`}>
              {ledger.hash}
            </Link>
          </div>
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/> {ledger.timestamp}
        </span>
      </div>
    );
  }

  render() {
    let { currency } = this.props;

    if (currency !== 'XLM') {
      return null;
    }

    return (
      <List
        className="latest-ledgers"
        icon={<i className="fa fa-book"/>}
        title="Ledgers"
        linkToAll="#"
        data={mockLedgers}
        renderItem={this._renderLedger}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(LatestLedgers);