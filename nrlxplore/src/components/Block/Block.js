import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { formatTxnData } from 'core';
import moment from 'moment';

class Block extends PureComponent {
  state = {
    visibleTxnCount: 10
  };

  handleViewMore = () => {
    this.setState({
      visibleTxnCount: this.state.visibleTxnCount + 10
    });
  }

  render() {
    const { className } = this.props;
    const { block } = this.props;
    const { currency } = this.props;

    const txns = block.txns.slice(0, this.state.visibleTxnCount);

    return (
      <div className={`nrl__block${className ? ' ' + className : ''}`}>
        <div className="nrl__block-info">
          <div className="nrl__block-info--icon">
            <i className="fa fa-cubes"/>
          </div>
          <div className="nrl__block-info--detail">
            <div className="summary">
              <p className="height">Height: {block.height}</p>
              <span className="txn-count">Transactions: {block.txns.length}</span>
            </div>
            <div className="detail">
              <div className="left">
                <p className="property">
                  Block Hash: <Link to={`/${currency.toLowerCase()}/block/${block.hash}`}>{block.hash}</Link>
                </p>
                {
                  block.prevHash && (
                    <p className="property">
                      Previous Hash: <Link to={`/${currency.toLowerCase()}/block/${block.prevHash}`}>{block.prevHash}</Link>
                    </p>
                  )
                }
                {
                  block.nextHash && (
                    <p className="property">
                      Next Hash: <Link to={`/${currency.toLowerCase()}/block/${block.nextHash}`}>{block.nextHash}</Link>
                    </p>
                  )
                }
                {
                  block.merkleRoot && (
                    <p className="property">
                      Merkle Root: <Link to={`/${currency.toLowerCase()}/block/${block.merkleRoot}`}>{block.merkleRoot}</Link>
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
                  block.size && (
                    <p className="property">
                      Block Size: {block.size}
                    </p>
                  )
                }
                {
                  block.bits && (
                    <p className="property">
                      Bits: {block.bits}
                    </p>
                  )
                }
                {
                  block.nonce && (
                    <p className="property">
                      Nonce: {block.nonce}
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
                  txns.map((txn, index) => {
                    return (
                      <tr key={index} className="nrl__block-txns--item">
                        <td className="icon">
                          <i className="fa fa-cubes"/>
                        </td>
                        <td className="block-height">
                          <p className="label">Block Height</p>
                          <Link to={`/${currency.toLowerCase()}/block/${block.height}`} className="value">
                            {block.height}
                          </Link>
                        </td>
                        <td className="hash">
                          <p className="label">TX Hash</p>
                          <Link to={`/${currency.toLowerCase()}/transaction/${txn.hash || txn}`} className="value">
                            {txn.hash || txn}
                          </Link>
                        </td>
                        <td className="time">
                          <p className="label">Time</p>
                          <span className="value">{moment.unix(block.timestamp).fromNow()}</span>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="nrl__block-txns--more">
            <a className="btn-viewmore" onClick={this.handleViewMore}>View More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Block;
