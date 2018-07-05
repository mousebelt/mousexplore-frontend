import React, { PureComponent } from 'react';
import moment from 'moment';
import HashLink from 'components/HashLink/HashLink';

import List from 'components/List/List';
import { connectSettings } from 'core';
import { formatBlockData } from 'core/utils';

class LatestBlocks extends PureComponent {
  state = {
    blocks: []
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency } = this.props;
    
    this.getLatestBlocks(apiObject, currency);
  }

  componentWillReceiveProps (newProps) {
    const { apiObject, currency } = newProps;
    
    this.getLatestBlocks(apiObject, currency);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getLatestBlocks (apiObject, currency) {
    this.setState({ blocks: [] });
    
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
    return (
      <div className="block">
        <i className="fa fa-cube icon"/>
        <div className="detail">
          <div className="height">
            <HashLink hash={block.height} type="block">
              #{block.height}
            </HashLink>
            <span className="time">
              <i className="fa fa-clock-o"/> {moment.unix(block.timestamp).fromNow()}
            </span>
          </div>
          <div className="hash">
            <HashLink hash={block.hash} type="block">
              {block.hash}
            </HashLink>
          </div>
        </div>
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