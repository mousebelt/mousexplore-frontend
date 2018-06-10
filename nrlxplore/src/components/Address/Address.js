import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

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
            txnHistory.map((txn, index) => {
              return (
                <tr className="txn" key={index}>
                  <td className="in-out">
                    {
                      <img src={txn.value < 0 ? icOut : icIn}/>
                    }
                  </td>
                  <td className="hash txn-hash">
                    <p className="label">TX Hash</p>
                    <Link className="value" to={`/${currency.toLowerCase()}/transaction/${txn.hash}`}>{txn.hash}</Link>
                  </td>
                  <td className="hash block-hash">
                    <p className="label">Block Hash</p>
                    <Link className="value" to={`/${currency.toLowerCase()}/block/${txn.block}`}>{txn.blockHash}</Link>
                  </td>
                  <td className="time">
                    <p className="label">Time</p>
                    <span className="value">{moment.unix(txn.timestamp).fromNow()}</span>
                  </td>
                  <td className="amount">
                    <p className="label">Amount</p>
                    <span className={`value ${txn.value < 0 ? 'out' : 'in'}`}>{`${txn.value.toFixed(2)} ${currency}`}</span>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  render () {
    const { className } = this.props;
    const { currency, address, balance, txnHistory, totalTxns, renderTXNHistory } = this.props;
    return (
      <div className={`nrl__address${className ? ' ' + className : ''}`}>
        <div className="nrl__address-info">
          <div className="nrl__address-info--icon">
            <img src={icCoin}/>
          </div>
          <div className="nrl__address-info--balance">
            <p>Balance: {balance} {currency}&nbsp;<i className="fa fa-angle-down"/></p>
            <span>{totalTxns} Transactions</span>
          </div>
          <div className="nrl__address-info--account">
            <p>Address</p>
            <span>{address}</span>
          </div>
        </div>
        <div className="nrl__address-txn">
          {
            renderTXNHistory ? renderTXNHistory() : this._renderTXNHistory()
          }
        </div>
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
  renderTXNHistory: PropTypes.func
}

export default Address;