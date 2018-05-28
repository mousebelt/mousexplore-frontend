import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import icCoin from 'assets/img/ic_coin.png';
import icIn from 'assets/img/ic_in.png';
import icOut from 'assets/img/ic_out.png';

class Address extends React.PureComponent {

  _renderTXNHistory = () => {
    const { txnHistory, address, currency } = this.props;

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
              const { from } = txn;
              const isOut = (from === address) ? true : false;
              return (
                <tr className="txn" key={index}>
                  <td className="in-out">
                    {
                      <img src={isOut ? icOut : icIn}/>
                    }
                  </td>
                  <td className="hash">
                    <p className="label">TX Hash</p>
                    <Link className="value" to={`/${currency.toLowerCase()}/transaction/${txn.hash}`}>{txn.hash}</Link>
                  </td>
                  <td className="block">
                    <p className="label">Block</p>
                    <Link className="value" to={`/${currency.toLowerCase()}/block/${txn.block}`}>{txn.block}</Link>
                  </td>
                  <td className="time">
                    <p className="label">Time</p>
                    <span className="value">{moment(txn.timestamp).fromNow()}</span>
                  </td>
                  <td className="amount">
                    <p className="label">Amount</p>
                    <span className={`value ${isOut ? 'out' : 'in'}`}>{txn.value}</span>
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
    const { currency, address, balance, txnHistory, renderTXNHistory } = this.props;
    return (
      <div className={`address${className ? ' ' + className : ''}`}>
        <div className="address__info">
          <div className="address__info-icon">
            <img src={icCoin}/>
          </div>
          <div className="address__info-balance">
            <p>Balance: {balance} {currency}&nbsp;<i className="fa fa-angle-down"/></p>
            <span>{txnHistory.length} Transactions</span>
          </div>
          <div className="address__info-account">
            <p>Address</p>
            <span>{address}</span>
          </div>
        </div>
        <div className="address__txn">
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
  balance: PropTypes.number,
  txnHistory: PropTypes.arrayOf(PropTypes.object),
  renderTXNHistory: PropTypes.func
}

export default Address;