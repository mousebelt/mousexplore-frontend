import React, { PureComponent } from 'react';
import Block from 'components/Block/Block';
import { connectSettings, formatBlockData } from 'core';

class BlockContainer extends PureComponent { 
  state = {
    block: undefined,
    isLoading: false
  };

  componentDidMount() {
    this._isMounted = true;

    const { apiObject, currency, match } = this.props;

    const { blockHash } = match.params;

    if (blockHash) {
      this.getBlock(apiObject, currency, blockHash);    
    }
  }

  componentWillReceiveProps(newProps) {
    const { apiObject, currency, match } = newProps;

    const { blockHash } = match.params;

    if (blockHash) {
      this.getBlock(apiObject, currency, blockHash);    
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getBlock(apiObject, currency, blockHash) {
    this.setState({
      block: undefined,
      isLoading: true,
    });

    apiObject.get(`/block/${blockHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }
        let block = res.data.data;

        block = formatBlockData(block, currency);

        if (this._isMounted)
          this.setState({ block: block });
      })
      .finally(() => {
        if (this._isMounted)
          this.setState({ isLoading: false })
      });
  }
  
  render () {
    const { currency } = this.props;
    const { block, isLoading } = this.state;
    
    return (
      <div className="block-container">
        <Block
          currency={currency}
          block={block}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(BlockContainer);