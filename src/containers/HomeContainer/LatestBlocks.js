import React, { PureComponent } from 'react';
import moment from 'moment';
import HashLink from 'components/HashLink/HashLink';

import List from 'components/List/List';
import { connectSettings } from 'core';
import { formatBlockData } from 'core/utils';

class LatestBlocks extends PureComponent {
  state = {
    blocks: [],
    isLoading: false
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
    this.setState({
      blocks: [],
      isLoading: true
    });
    
    apiObject.get('/blocks', {
      params: { count: 5}
    })
    .then(res => {
      let blocks = res.data.data.result;
      
      blocks = blocks.map(block => formatBlockData(block, currency));
 
      if (this._isMounted)
        this.setState({ blocks });
    })
    .finally(() => {
      if (this._isMounted)
        this.setState({ isLoading: false });
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
        data={this.state.blocks}
        renderItem={this._renderBlock}
        isLoading={this.state.isLoading}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LatestBlocks);