import React, { PureComponent } from 'react';
import { connectSettings } from 'core';
import moment from 'moment';

import Txn from 'components/Txn/Txn';

const mockBTCTxn = {
  "txid": "3bf8c518a7a1187287516da67cb96733697b1d83eb937e68ae39bd4c08e563b7",
  "hash": "3bf8c518a7a1187287516da67cb96733697b1d83eb937e68ae39bd4c08e563b7",
  "version": 1,
  "size": 126,
  "vsize": 126,
  "weight": 504,
  "locktime": 0,
  "vin": [
      {
          "coinbase": "0440bebf4f0122172f503253482f49636549726f6e2d51432d6d696e65722f",
          "sequence": 4294967295
      }
  ],
  "vout": [
      {
          "value": 50,
          "n": 0,
          "scriptPubKey": {
              "asm": "03a5f981bf546b95152ed6695bc50edd0b8db3afb48839b9d58714519e5bdd1f95 OP_CHECKSIG",
              "hex": "2103a5f981bf546b95152ed6695bc50edd0b8db3afb48839b9d58714519e5bdd1f95ac",
              "reqSigs": 1,
              "type": "pubkey",
              "addresses": [
                  "mw8BoejnFJmntv3PjKAcPbuB6PMsBnAGDQ"
              ]
          }
      }
  ],
  "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff1f0440bebf4f0122172f503253482f49636549726f6e2d51432d6d696e65722fffffffff0100f2052a01000000232103a5f981bf546b95152ed6695bc50edd0b8db3afb48839b9d58714519e5bdd1f95ac00000000",
  "blockhash": "00000000373403049c5fff2cd653590e8cbe6f7ac639db270e7d1a7503d698df",
  "confirmations": 1209804,
  "time": 1337966144,
  "blocktime": 1337966144
};

class TxnContainer extends PureComponent {

  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      txnHash: match.params.txnHash,
      txnDetail: undefined
    };
  }
  
  _renderBTC = (txnDetail) => {
    if (!txnDetail) {
      return <p>No content...</p>
    }

    return (
      <div className="txn-btc">
        <div className="status">
          <span className="label">
            TxReceipt Status:&nbsp;
          </span>
          <span className={`value ${txnDetail.confirmations > 1 ? 'success' : 'failure'}`}>
            {txnDetail.confirmations > 1 ? 'Success' : 'Failed'}
          </span>
        </div>
        <div className="input-output">
        </div>
        <div className="time">
          <span className="label">
            Included In Blocks:&nbsp; 
          </span>
          <span className="value">
            Sent on {moment(txnDetail.blocktime).format('lll')} ({moment(txnDetail.blocktime).fromNow()})
          </span>
        </div>
        <div className="conformation">
          <span className="label">
            Confirmations:&nbsp;
          </span>
          <span className="value">{txnDetail.confirmations}</span>
        </div>
      </div>
    );
  }

  componentDidMount () {
    const { match } = this.props;
  }

  render() {
    const { currency } = this.props;
    return (
      <div className="txn-container">
        <Txn
          currency={currency}
          txnHash={this.state.txnHash}
        >
          {
            this._renderBTC(mockBTCTxn)
          }
        </Txn>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(TxnContainer);
