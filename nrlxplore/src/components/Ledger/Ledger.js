import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { formatTxnData } from 'core';
import moment from 'moment';

class Ledger extends PureComponent {
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
    const { ledger } = this.props;
    const { currency } = this.props;

    const txns = ledger.txns.slice(0, this.state.visibleTxnCount);

    return (
      <div>
        <div className={`nrl__ledger${className ? ' ' + className : ''}`}>
          <div className="nrl__ledger-info">
            <div className="nrl__ledger-info--icon">
              <i className="fa fa-cubes"/>
            </div>
            <div className="summary">
              <p className="height">Height: {ledger.height}</p>
              <span className="txn-count">Transactions: {ledger.txns.length}</span>
            </div>
          </div>
          <div className="nrl__ledger-info--detail">
            <div className="detail">
              <div className="left">
                <p className="property">
                  Ledger Hash: <Link to={`/${currency.toLowerCase()}/ledger/${ledger.hash}`}>{ledger.hash}</Link>
                </p>
                {
                  ledger.previousledgerhash && (
                    <p className="property">
                      Previous Hash: <Link to={`/${currency.toLowerCase()}/ledger/${ledger.prevHash}`}>{ledger.prevHash}</Link>
                    </p>
                  )
                }
                {
                  ledger.nextledgerhash && (
                    <p className="property">
                      Next Hash: <Link to={`/${currency.toLowerCase()}/ledger/${ledger.nextHash}`}>{ledger.nextHash}</Link>
                    </p>
                  )
                }
                {
                  ledger.merkleroot && (
                    <p className="property">
                      Merkle Root: <Link to={`/${currency.toLowerCase()}/ledger/${ledger.merkleRoot}`}>{ledger.merkleRoot}</Link>
                    </p>
                  )
                }
              </div>
              <div className="right">
                {
                  ledger.confirmations && (
                    <p className="property">
                      Confirmations: {ledger.confirmations}
                    </p>
                  )
                }
                {
                  ledger.size && (
                    <p className="property">
                      Ledger Size: {ledger.size}
                    </p>
                  )
                }
                {
                  ledger.bits && (
                    <p className="property">
                      Bits: {ledger.bits}
                    </p>
                  )
                }
                {
                  ledger.nonce && (
                    <p className="property">
                      Nonce: {ledger.nonce}
                    </p>
                  )
                }
              </div>
              <div className="time">
                <p className="property">Timestamp: { moment.unix(ledger.time).format('YYYY-M-D h:mm:ss a') }</p>
              </div>
            </div>
          </div>
        </div>
        <div className="nrl__ledger-txns">
          <h3 className="nrl__ledger-txns--title">
            Transactions In Ledger&nbsp;<span className="height">{ledger.height}</span>
          </h3>
          <div className="nrl__ledger-txns--table">
            <table>
              <tbody>
                {
                  txns.map((txn, index) => {
                    return (
                      <tr key={index} className="nrl__ledger-txns--item">
                        <td className="icon">
                          <i className="fa fa-cubes"/>
                        </td>
                        <td className="ledger-height">
                          <p className="label">Ledger Height</p>
                          <Link to={`/${currency.toLowerCase()}/ledger/${ledger.height}`} className="value">
                            {ledger.height}
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
                          <span className="value">{moment.unix(ledger.timestamp).fromNow()}</span>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="nrl__ledger-txns--more">
            <a className="btn-viewmore" onClick={this.handleViewMore}>View More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Ledger;
