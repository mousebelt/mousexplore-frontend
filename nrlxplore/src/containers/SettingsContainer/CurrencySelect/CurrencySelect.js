import React, { PureComponent } from 'react';
import DropdownSelect from 'components/DropdownSelect/DropdownSelect';

import { coins } from 'config';

class CurrencySelect extends PureComponent {
  render() {
    const currencyOptions = coins.map((coin, index) => ({
      name: coin.name,
      value: coin.currency
    }));

    const { options, className, placeholder } = this.props;

    return (
      <DropdownSelect
        {...this.props}
        className="settings__filter-currency"
        placeholder="Select Currency"
        options={options ? options : currencyOptions}
      />
    );
  }
}

export default CurrencySelect;
