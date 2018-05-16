import React, { Component } from 'react';
import CurrencySelect from './CurrencySelect/CurrencySelect';
import NetTypeToggle from './NetTypeToggle/NetTypeToggle';
import TokenSelect from './TokenSelect/TokenSelect';
import SearchBar from 'shared/SearchBar/SearchBar';

import 'assets/styles/SettingsContainer.css';


class SettingsContainer extends Component {
  render() {
    return (
      <div className={'settings'}>
        <div className='filter-container'>
          <CurrencySelect />
          <NetTypeToggle />
          <TokenSelect />
        </div>
        <div className='search-container'>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default SettingsContainer;
