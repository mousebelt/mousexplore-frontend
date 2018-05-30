import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DropdownSelect from 'components/DropdownSelect/DropdownSelect';

import { findCoinByCurrency } from 'config';

class TokenSelect extends PureComponent {
  handleChange = (ticker) => {
    const { setTicker } = this.props;
    setTicker(ticker);
  }

  render() {
    const { currency, ticker } = this.props;
    let tokenOptions = [];

    const coin = findCoinByCurrency(currency);
    if (coin && coin.hasTokens && coin.tokens) {
      tokenOptions = coin.tokens.map((token) => ({
        name: `${token.tokenName} ( ${token.ticker} )`,
        value: token.ticker
      }));
    }

    return (
      <DropdownSelect
        className="settings__filter-token"
        placeholder="Select Token (Optional)"
        options={tokenOptions}
        onChange={this.handleChange}
        value={ticker}
        disabled={tokenOptions.length > 0 ? null : 'disabled'}
      />
    );
  }
}

TokenSelect.propTypes = {
  currency: PropTypes.string,
  ticker: PropTypes.string,
  setTicker: PropTypes.func
}

export default TokenSelect;
