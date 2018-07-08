import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connectSettings } from 'core';
import { notification } from 'antd';
import qs from 'qs';

import OwnerLogo from './OwnerLogo/OwnerLogo';
import CurrencySelect from './CurrencySelect/CurrencySelect';
import NetTypeToggle from './NetTypeToggle/NetTypeToggle';
import TokenSelect from './TokenSelect/TokenSelect';
import SearchBar from 'components/SearchBar/SearchBar';

class SettingsContainer extends PureComponent {
  handleSearch = (searchString) => {

    const { history, settings } = this.props;
    const { apiObject } = settings;

    apiObject.get(`/search/${searchString}`)
      .then(res => {
        if (res.data.status !== 200)
          throw Error('Invalid search string');

        const type = res.data.data.type;

        const queryString = qs.stringify({
          net: (settings.netType.toLowerCase() === 'test') ? settings.netType.toLowerCase() : undefined,
          ticker: settings.ticker ? settings.ticker.toLowerCase() : undefined,
        });

        const newLocation = history.createHref({
          pathname: `/${settings.currency.toLowerCase()}/${type}/${searchString}`,
          search: queryString,
        });

        history.push(newLocation);
      })
      .catch(err => {
        notification.warning({
          message: err.message,
          description : `We can't find matching keyword`
        });
      })
  }

  render() {
    const { settings, setCurrency, setNetType, setTicker } = this.props;
    return (
      <div className="settings">
        <OwnerLogo currency={this.props.settings.currency}/>  
        <div className="settings__filter">
          <CurrencySelect
            currency={settings.currency}
            setCurrency={setCurrency}
          />
          <NetTypeToggle
            currency={settings.currency}
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
          <SearchBar onSearch={this.handleSearch}/>
        </div>
      </div>
    );
  }
}

// SettingsContainer.propTypes = {

//   // Current state of settings in redux
//   settings: PropTypes.shape({
//     currency: PropTypes.string,
//     netType: PropTypes.string,
//     ticker: PropTypes.string,
//     apiObject: PropTypes.object
//   }),

//   // Action dispatcher to set the state of settings
//   setSettings: PropTypes.func
  
// }

export default compose(
  connectSettings(),
  withRouter
)(SettingsContainer);
