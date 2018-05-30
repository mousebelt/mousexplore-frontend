import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Block extends PureComponent {
  render() {
    const { className } = this.props;
    const { block, txns } = this.props;
    const { currency } = this.props;

    return (
      <div className={`block${className ? ' ' + className : ''}`}>
        <div className="block__info">
          <div className="block__info-icon">
            <i className="fa fa-cubes"/>
          </div>
          <div className="block__info-detail">
            <div className="summary">
              <p className="height">Height: {block.height}</p>
              <span className="txn-count">Transactions: {block.txn}</span>
            </div>
            <div className="detail">
              <div className="left">
                <p className="property">
                  Block Hash: <Link to={`/block/${block.hash}`}>{block.hash}</Link>
                </p>
                {
                  block.prevHash && (
                    <p className="property">
                      Previous Hash: <Link to={`/block/${block.prevHash}`}>{block.prevHash}</Link>
                    </p>
                  )
                }
                {
                  block.nextHash && (
                    <p className="property">
                      Next Hash: <Link to={`/block/${block.nextHash}`}>{block.nextHash}</Link>
                    </p>
                  )
                }
                {
                  block.merkleRoot && (
                    <p className="property">
                      Merkle Root: <Link to={`/block/${block.merkleRoot}`}>{block.merkleRoot}</Link>
                    </p>
                  )
                }
              </div>
              <div className="right">
                {
                  block.confirmations && (
                    <p className="property">
                      Confirmations: {block.confirmations}
                    </p>
                  )
                }
                {
                  block.confirmations && (
                    <p className="property">
                      Block Size: {block.size}
                    </p>
                  )
                }
                {
                  block.confirmations && (
                    <p className="property">
                      Bits: {block.bits}
                    </p>
                  )
                }
                {
                  block.confirmations && (
                    <p className="property">
                      Block Reward: {block.reward}
                    </p>
                  )
                }
              </div>
              <div className="time">
                <p className="property">Timestamp {moment(block.time).format('lll')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="block__txns">
          <h3 className="block__txns-title">
            Transactions In Block&nbsp;<span className="height">{block.height}</span>
          </h3>
          <div className="block__txns-table">
            <table>
              <tbody>
                {
                  txns.map((txn, index) => (
                    <tr key={txn.hash} className="block_txns-item">
                      <td className="icon">
                        <i className="fa fa-cubes"/>
                      </td>
                      <td className="block-height">
                        <p className="label">Block Height</p>
                        <span className="value">{block.height}</span>
                      </td>
                      <td className="hash">
                        <p className="label">TX Hash</p>
                        <span className="value">{txn.hash}</span>
                      </td>
                      <td className="time">
                        <p className="label">Time</p>
                        <span className="value">{moment(block.time).fromNow()}</span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Block;
