import React, { Component } from 'react';
import OwnerLogo from './OwnerLogo/OwnerLogo';
import CurrencySelect from './CurrencySelect/CurrencySelect';
import NetTypeToggle from './NetTypeToggle/NetTypeToggle';
import TokenSelect from './TokenSelect/TokenSelect';
import SearchBar from 'components/SearchBar/SearchBar';

class SettingsContainer extends Component {
  render() {
    return (
      <div className="settings">
        <OwnerLogo/>  
        <div className="settings__filter">
          <CurrencySelect />
          <NetTypeToggle />
          <TokenSelect />
        </div>
        <div className="settings__search">
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default SettingsContainer;
