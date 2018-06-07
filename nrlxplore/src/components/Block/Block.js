import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Block extends PureComponent {
  render() {
    const { className } = this.props;
    const { block, txns } = this.props;
    const { currency } = this.props;

    return (
      <div className={`nrl__block${className ? ' ' + className : ''}`}>
        <div className="nrl__block-info">
          <div className="nrl__block-info--icon">
            <i className="fa fa-cubes"/>
          </div>
          <div className="nrl__block-info--detail">
            <div className="summary">
              <p className="height">Height: {block.height}</p>
              <span className="txn-count">Transactions: {txns.length}</span>
            </div>
            <div className="detail">
              <div className="left">
                <p className="property">
                  Block Hash: <Link to={`/${currency}/block/${block.hash}`}>{block.hash}</Link>
                </p>
                {
                  block.prevHash && (
                    <p className="property">
                      Previous Hash: <Link to={`/${currency}/block/${block.prevHash}`}>{block.prevHash}</Link>
                    </p>
                  )
                }
                {
                  block.nextHash && (
                    <p className="property">
                      Next Hash: <Link to={`/${currency}/block/${block.nextHash}`}>{block.nextHash}</Link>
                    </p>
                  )
                }
                {
                  block.merkleRoot && (
                    <p className="property">
                      Merkle Root: <Link to={`/${currency}/block/${block.merkleRoot}`}>{block.merkleRoot}</Link>
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
        <div className="nrl__block-txns">
          <h3 className="nrl__block-txns--title">
            Transactions In Block&nbsp;<span className="height">{block.height}</span>
          </h3>
          <div className="nrl__block-txns--table">
            <table>
              <tbody>
                {
                  txns.map((txn, index) => (
                    <tr key={index} className="nrl__block-txns--item">
                      <td className="icon">
                        <i className="fa fa-cubes"/>
                      </td>
                      <td className="block-height">
                        <p className="label">Block Height</p>
                        <Link to={`/${currency}/block/${block.height}`} className="value">{block.height}</Link>
                      </td>
                      <td className="hash">
                        <p className="label">TX Hash</p>
                        <Link to={`/${currency}/transaction/${txn}`} className="value">{txn}</Link>
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
