import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectSettings } from 'core';

import OwnerLogo from './OwnerLogo/OwnerLogo';
import CurrencySelect from './CurrencySelect/CurrencySelect';
import NetTypeToggle from './NetTypeToggle/NetTypeToggle';
import TokenSelect from './TokenSelect/TokenSelect';
import SearchBar from 'components/SearchBar/SearchBar';

class SettingsContainer extends Component {
  render() {
    const { settings, setCurrency, setNetType, setTicker } = this.props;
    return (
      <div className="settings">
        <OwnerLogo/>  
        <div className="settings__filter">
          <CurrencySelect
            currency={settings.currency}
            setCurrency={setCurrency}
          />
          <NetTypeToggle
            netType={settings.netType}
            setNetType={setNetType}
          />
          <TokenSelect
            currency={settings.currency}
            ticker={settings.ticker}
            setTicker={setTicker}
          />
        </div>
        <div className="settings__search">
          <SearchBar />
        </div>
      </div>
    );
  }
}

SettingsContainer.propTypes = {

  // Current state of settings in redux
  settings: PropTypes.shape({
    currency: PropTypes.string,
    netType: PropTypes.string,
    ticker: PropTypes.string
  }),

  // Action dispatcher to set the state of settings
  setSettings: PropTypes.func
  
}

export default connectSettings()(SettingsContainer);
