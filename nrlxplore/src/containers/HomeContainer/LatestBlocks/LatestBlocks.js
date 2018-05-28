import React, { PureComponent } from 'react';
import List from 'components/List/List';
import { connectSettings } from 'core';

import { Link } from 'react-router-dom';

const mockBlocks = [
  {
    height: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0x000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
]

class LatestBlocks extends PureComponent {
  _renderBlock = (block) => {
    let { currency } = this.props;

    currency = currency.toLowerCase();
    
    return (
      <div className="block">
        <i className="fa fa-cube icon"/>
        <div className="detail">
          <div className="height">
            <Link to={`/${currency}/block/${block.hash}`}>
              #{block.height}
            </Link>
          </div>
          <div className="hash">
            <Link to={`/${currency}/block/${block.hash}`}>
              {block.hash}
            </Link>
          </div>
        </div>
        <span className="time">
          <i className="fa fa-clock-o"/> {block.timestamp}
        </span>
      </div>
    );
  }

  render() {
    return (
      <List
        className="latest-blocks"
        icon={<i className="fa fa-cubes"/>}
        title="Blocks"
        linkToAll="#"
        data={mockBlocks}
        renderItem={this._renderBlock}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(LatestBlocks);