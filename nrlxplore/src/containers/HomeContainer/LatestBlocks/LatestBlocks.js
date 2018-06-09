import React, { PureComponent } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import List from 'components/List/List';
import { connectSettings } from 'core';
import { formatBlockData } from 'core/utils';

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
  state = {
    blocks: []
  };

  componentDidMount() {
    const { apiObject, currency } = this.props;
    
    this.getLatestBlocks(apiObject, currency);
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      blocks: []
    });
    
    const { apiObject, currency } = newProps;
    
    this.getLatestBlocks(apiObject, currency);
  }

  getLatestBlocks (apiObject, currency) {
    
    apiObject.get('/blocks', {
      params: { count: 5}
    })
    .then(res => {
      let blocks = res.data.data.result;
      
      blocks = blocks.map(block => {
        return formatBlockData(block, currency);
      });
 
      this.setState({ blocks });
    });
  }

  _renderBlock = (block) => {
    let { currency } = this.props;

    currency = currency.toLowerCase();
    
    return (
      <div className="block">
        <i className="fa fa-cube icon"/>
        <div className="detail">
          <div className="height">
            <Link to={`/${currency}/block/${block.height}`}>
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
          <i className="fa fa-clock-o"/> {moment.unix(block.timestamp).fromNow()}
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
        data={this.state.blocks}
        renderItem={this._renderBlock}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LatestBlocks);