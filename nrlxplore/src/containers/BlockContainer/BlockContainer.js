import React, { PureComponent } from 'react';
import Block from 'components/Block/Block';
import NotFound from 'components/NotFound/NotFound';
import { connectSettings, formatBlockData } from 'core';

const mockBlock = {
  "hash": "40fec69d3163bac5374f57aa220233b95e1706a0a03e14243d650029ec2efa1e",
  "confirmations": 5,
  "strippedsize": 52959,
  "size": 53104,
  "weight": 211981,
  "height": 1266158,
  "version": 536870912,
  "versionHex": "20000000",
  "merkleroot": "b413a8082b764e21c34cb164870fd52143bf0bb1743ef2a606aa73a9954b42fc",
  "tx": [
      "b1d54e9d08a8f222fb6a4ebece90932e7971a4405db0098f81a4a8a2bb43217b",
      "484cb18f9581f57058554c9cf429c9d0ccaab9ef3ee76ae56d59d0d2aa9ab2d8",
      "39b560c16052ebf26e44df20c62aae5d443274c73b3cb1ac79a74b0648a5aafa"
  ],
  "time": 1503852802,
  "mediantime": 1503851649,
  "nonce": 2257362723,
  "bits": "1a20288a",
  "difficulty": 521698.3153549416,
  "chainwork": "00000000000000000000000000000000000000000000000c4ffe69f34f4eed62",
  "previousblockhash": "3969d10f019b999661d87bd93852f739a27879ca102666a9638af5cf5451f07d",
  "nextblockhash": "2761b647d9d311b29d3c0a3517e71fcd6afafd06ab7ca94f9475e0849859a280"
}

class BlockContainer extends PureComponent {
  state = {
    block: undefined
  };

  componentDidMount() {
    const { apiObject, currency, match } = this.props;

    const { blockHash } = match.params;

    if (blockHash) {
      this.getBlock(apiObject, currency, blockHash);    
    }
  }

  componentWillReceiveProps () {
    const { apiObject, currency, match } = this.props;

    const { blockHash } = match.params;

    if (blockHash) {
      this.getBlock(apiObject, currency, blockHash);    
    }
  }

  getBlock(apiObject, currency, blockHash) {
    apiObject.get(`/block/${blockHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }
        let block = res.data.data;

        block = formatBlockData(block, currency);

        this.setState({ block: block });

      })
  }
  
  render () {
    const { currency } = this.props;
    const { block } = this.state;
    
    console.log(block);

    return (
      <div className="block-container">
        {
          block ? (
            <Block
              currency={currency}
              block={block}
            />
          ) : (
            <NotFound/>
          )
        }
        
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(BlockContainer);