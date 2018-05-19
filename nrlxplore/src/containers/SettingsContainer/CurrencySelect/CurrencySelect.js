import React, { PureComponent } from 'react';
import DropdownSelect from 'components/DropdownSelect/DropdownSelect';

import { coins } from 'config';

class CurrencySelect extends PureComponent {
  render() {
    const currencyOptions = coins.map((coin, index) => ({
      name: coin.name,
      value: coin.currency
    }));

    const { options, className, placeholder, props } = this.props;

    return (
      <DropdownSelect
        {...props}
        className={className ? className: "settings__filter-currency"}
        placeholder={placeholder ? placeholder: "Select Currency"}
        options={options ? options : currencyOptions}
      />
    );
  }
}

export default CurrencySelect;
