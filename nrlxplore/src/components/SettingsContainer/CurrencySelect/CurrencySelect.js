import React, { Component } from 'react';

import DropdownSelect from 'shared/DropdownSelect/DropdownSelect';

const mockCurrencySelect = {
  className: 'currency-select',
  placeholder: 'Select Currency',
  defaultValue: 'btc',
  options: [
    {
      value: 'btc',
      name: 'Bitcoin'
    },
    {
      value: 'eth',
      name: 'Ethereum'
    }
  ]
}

class CurrencySelect extends Component {
  render() {
    return (
      <div className='currency-select-container'>
        <DropdownSelect
          className={mockCurrencySelect.className}
          placeholder={mockCurrencySelect.placeholder}
          options={mockCurrencySelect.options}
          defaultValue={mockCurrencySelect.defaultValue} />
      </div>
    );
  }
}

export default CurrencySelect;
