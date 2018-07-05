import React, { PureComponent } from 'react';
import HashLink from 'components/HashLink/HashLink';
import moment from 'moment';

class Ledger extends PureComponent {
  render() {
    const { className } = this.props;
    const { ledger, txns } = this.props;

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
                  Ledger Hash: {ledger.hash}
                </p>
                {
                  ledger.prevHash &&
                  <p className="property">
                    Previous Hash: <HashLink hash={ledger.height-1} type="ledger">{ledger.prevHash}</HashLink>
                  </p>
                }
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
                <p className="property">
                  Timestamp: { moment(ledger.timestamp).format('YYYY-M-D h:mm:ss a') }
                </p>
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
                          <HashLink hash={ledger.height} type="ledger" className="value">
                            {ledger.height}
                          </HashLink>
                        </td>
                        <td className="hash">
                          <p className="label">TX Hash</p>
                          <HashLink hash={txn.hash || txn} type="transaction" className="value">
                            {txn.hash || txn}
                          </HashLink>
                        </td>
                        <td className="operations">
                          <p className="label">Operations</p>
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
