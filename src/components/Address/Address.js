import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import HashLink  from 'components/HashLink/HashLink';

import icCoin from 'assets/img/ic_coin.png';
import icIn from 'assets/img/ic_in.png';
import icOut from 'assets/img/ic_out.png';

class Address extends React.PureComponent {

  _renderTXNHistory = () => {
    const { txnHistory, currency } = this.props;

    if (!(txnHistory && txnHistory.length)) {
      return (
        <span className="no-txn-history">
          No transaction history
        </span>
      );
    }
      
    return (
      <table className="txn-table">
        <tbody>
          {
            currency !== 'XLM' ? (
              txnHistory.map((txn, index) => {
                return (
                  <tr className="txn" key={index}>
                    <td className="in-out">
                      {
                        <img src={txn.value < 0 ? icOut : icIn} alt=""/>
                      }
                    </td>
                    <td className="amount">
                      <p className="label">Amount</p>
                      <span className={`value ${txn.value < 0 ? 'out' : 'in'}`}>{`${txn.value.toFixed(2)} ${currency}`}</span>
                    </td>
                    <td className="hash txn-hash">
                      <p className="label">TX Hash</p>
                      <HashLink className="value" hash={txn.hash} type="transaction">{txn.hash}</HashLink>
                    </td>
                    <td className="hash block-hash">
                      <p className="label">Block Hash</p>
                      <HashLink className="value" hash={txn.blockHash} type="block">{txn.blockHash}</HashLink>
                    </td>
                    <td className="time">
                      <p className="label">Time</p>
                      <span className="value">{moment.unix(txn.timestamp).fromNow()}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              txnHistory.map((txn, index) => {
                return (
                  <tr className="txn" key={index}>
                    <td className="hash txn-hash">
                      <p className="label">TX Hash</p>
                      <HashLink className="value" hash={txn.hash} type="transaction">{txn.hash}</HashLink>
                    </td>
                    <td className="hash block-hash">
                      <p className="label">Ledger Sequence</p>
                      <HashLink className="value" hash={txn.blockHash} type="block">{txn.ledger}</HashLink>
                    </td>
                    <td className="time">
                      <p className="label">Time</p>
                      <span className="value">{moment(txn.timestamp).fromNow()}</span>
                    </td>
                    <td className="amount">
                      <p className="label">Operations</p>
                      <span className="value">{txn.opCount}</span>
                    </td>
                  </tr>
                );
              })
            )
          }
        </tbody>
      </table>
    );
  }

  render () {
    const { className } = this.props;
    const {
      currency, address, balance, totalTxns,
      renderTXNHistory, onViewMore, tokenBalances
    } = this.props;
    
    return (
      <div className={`nrl__address${className ? ' ' + className : ''}`}>
        <div className="nrl__address-info">
          <div className="nrl__address-info--header">
            <div className="nrl__address-info--icon">
              <img src={icCoin} alt=""/>
            </div>
            <div className="nrl__address-info--balance">
              <p>Balance: {(+balance).toFixed(4)} {currency}&nbsp;</p>
              <span>{totalTxns} Transactions</span>
            </div>
          </div>
          <div className="nrl__address-info--account">
            <p>Address</p>
            <span>{address}</span>
          </div>
        </div>
        {
          (tokenBalances && tokenBalances.length > 1) && (
            <div className="nrl__address-info--tokens">
              {
                tokenBalances.map(token => (
                  <p className="token" key={token.symbol}>
                    <span className="symbol">{token.symbol || `Unknown Asset(${token.asset})`}: </span>
                    <span className="balance">{token.balance}</span>
                  </p>
                ))
              }
            </div>
          )
        }
        <div className="nrl__address-txns">
          {
            renderTXNHistory ? renderTXNHistory() : this._renderTXNHistory()
          }
        </div>
        {
          <div className="nrl__address-txns--more">
            <a className="btn-viewmore" onClick={onViewMore}>View More</a>
          </div>
          // (totalTxns && (totalTxns > txnHistory.length)) ? (
          //   <div className="nrl__address-txns--more">
          //     <a className="btn-viewmore" onClick={onViewMore}>View More</a>
          //   </div>
          // ) : null
        }
      </div>
    );
  }
}

Address.propTypes = {
  currency: PropTypes.string,
  address: PropTypes.string,
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  txnHistory: PropTypes.arrayOf(PropTypes.object),
  totalTxns: PropTypes.number,
  renderTXNHistory: PropTypes.func,
  onViewMore: PropTypes.func
}

export default Address;