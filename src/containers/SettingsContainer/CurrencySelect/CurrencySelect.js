import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { coins } from 'config';

import DropdownSelect from 'components/DropdownSelect/DropdownSelect';

class CurrencySelect extends PureComponent {

  handleChange = (currency) => {
    const { setCurrency } = this.props;
    setCurrency(currency);
  }

  render() {
    const { currency } = this.props;
    const currencyOptions = coins.map((coin, index) => ({
      name: coin.name,
      value: coin.currency
    }));

    return (
      <DropdownSelect
        className="settings__filter-currency"
        placeholder="Select Currency"
        value={currency}
        options={currencyOptions}
        onChange={this.handleChange}
      />
    );
  }
}

CurrencySelect.propTypes = {
  currency: PropTypes.string,
  setCurrency: PropTypes.func,
}

export default CurrencySelect;
