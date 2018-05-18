import React, { PureComponent } from 'react';
import DropdownSelect from 'components/DropdownSelect/DropdownSelect';

import { coins } from 'config';

class TokenSelect extends PureComponent {
  render() {
    const currencyOptions = coins.map((coin, index) => ({
      name: coin.name,
      value: coin.currency
    }));

    const { options, className, placeholder } = this.props;

    return (
      <DropdownSelect
        {...this.props}
        className="settings__filter-token"
        placeholder="Select Token (Optional)"
        options={options ? options : currencyOptions}
      />
    );
  }
}

export default TokenSelect;
