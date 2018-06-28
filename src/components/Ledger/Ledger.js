import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { formatTxnData } from 'core';
import moment from 'moment';

class Ledger extends PureComponent {
  render() {
    const { className } = this.props;
    const { currency, ledger, txns } = this.props;

    return (
      <div>
        <div className={`nrl__ledger${className ? ' ' + className : ''}`}>
          <div className="nrl__ledger-info">
            <div className="nrl__ledger-info--icon">
              <i className="fa fa-cubes"/>
            </div>
            <div className="summary">
              <p className="height">Sequence: {ledger.height}</p>
              <span className="txn-count">Transactions: {ledger.txnCount}, Operations: {ledger.opCount} </span>
            </div>
          </div>
          <div className="nrl__ledger-info--detail">
            <div className="detail">
              <div className="left">
                <p className="property">
                  Ledger Hash: <Link to={`/${currency.toLowerCase()}/ledger/${ledger.hash}`}>{ledger.hash}</Link>
                </p>
                
                <p className="property">
                  Previous Hash: <Link to={`/${currency.toLowerCase()}/ledger/${ledger.prevHash}`}>{ledger.prevHash}</Link>
                </p>
              </div>
              <div className="right">
                <p className="property">
                  Fee: {ledger.fee}
                </p>
                <p className="property">
                  Base Fee: {ledger.baseFee} Stroops
                </p>
                <p className="property">
                  Total Coins: {(+ledger.totalCoins).toFixed(2)}
                </p>
              </div>
              <div className="time">
                <p className="property">Timestamp: { moment(ledger.timestamp).format('YYYY-M-D h:mm:ss a') }</p>
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
                          <p className="label">Ledger</p>
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
                        <td className="operations">
                          <p className="label">Operations</p>
                          {/* <Link to={`/${currency.toLowerCase()}/transaction/${txn.hash || txn}`} className="value">
                            {txn.hash || txn}
                          </Link> */}
                          <span className="value">{txn.opCount}</span>
                        </td>
                        <td className="time">
                          <p className="label">Time</p>
                          <span className="value">{moment(ledger.timestamp).fromNow()}</span>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Ledger;
