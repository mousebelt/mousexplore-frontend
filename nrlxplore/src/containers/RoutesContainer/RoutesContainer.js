import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import qs from 'query-string';
import { isEqual } from 'lodash';

import { findCoinByCurrency, findTokenByTicker } from 'config';
import { connectSettings, settingsActionCreators } from 'core';

import HomeContainer from 'containers/HomeContainer/HomeContainer';
import BlockTableContainer from 'containers/BlockTableContainer/BlockTableContainer';
import BlockContainer from 'containers/BlockContainer/BlockContainer';
import TxnTableContainer from 'containers/TxnTableContainer/TxnTableContainer';
import TxnContainer from 'containers/TxnContainer/TxnContainer';
import AddressContainer from 'containers/AddressContainer/AddressContainer';

/**
 * All App routing is started off from currency name (i.e '/btc' or '/eth').
 * The currency parameter receives it and if currency parameter value doesn't match 
 * with any of supported coin then it redirect to '/404'.
 * Network type and ticker are optional parameter in search query.
 * 
 * Default currency: BTC
 * Default network: livenet
 * 
 * 
 * Example URLs to pages
 * 
 * Homepage - '/etc?net=live&ticker=VEN'
 * Block list page - '/etc/blocks'
 * Block detail page - '/etc/block/0000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142'
 * Transaction list page - '/etc/transactions?net=live&ticker=VEN'
 * Transaction detail page - '/etc/transaction/0x751c37f62829d703e7cdb02c9315044001aa901e31284f0ed403b63fa72b1ed0'
 * Address page - '/etc/address/0xf50c1e11808d33b3b27088b081b3df1dbde7dfcd'
 */

class RoutesContainer extends PureComponent {

  componentWillMount() {
    const { history, setSettings } = this.props;

    /**
     * Check whether the url is valid before mounting
     * 
     * If returned paramemter is undefined,
     *    it means invalid url and should redirect to 404 page.
     * Else 
     *    set the state of settings in redux store with new settings from url
     */
    const newSettings = this.getSettingsFromURL();

    if (!newSettings)
      history.replace('/404');
    else
      setSettings(newSettings);
  }

  componentWillReceiveProps(newProps) {
    const { history, location } = newProps;

    const newSettings = newProps.settings;
    const curSettings = this.props.settings;

    if (!isEqual(curSettings, newSettings)) {
      const queryString = qs.stringify({
        net: (newSettings.netType.toLowerCase() === 'test') ? newSettings.netType.toLowerCase() : undefined,
        ticker: newSettings.ticker ? newSettings.ticker.toLowerCase() : undefined,
      });

      const matchParams = location.pathname.split('/');
      matchParams[1] = newSettings.currency.toLowerCase();
      const newPathName = matchParams.join('/');

      const newLocation = history.createHref({
        hash: '',
        pathname: newPathName,
        search: queryString,
        state: undefined
      });

      history.push(newLocation);
    }
    
  }

  getSettingsFromURL () {
    const { location, match } = this.props;
    const newSettings = {};
    
    if (!match.params || !match.params.currency) {
      return undefined;
    }

    // Get currency, net (optional in query param), ticker (optional in query param) of sub token
    const currency = match.params.currency;
    const { net, ticker } = qs.parse(location.search);
    
    const coin = findCoinByCurrency(currency);
    
    if (!coin) 
      return undefined;

    if (net && (net !== 'live' && net !== 'test')) {
      return undefined;
    }

    if (ticker && !findTokenByTicker(coin.currency, ticker)) 
      return undefined;

    const token = ticker ? (findTokenByTicker(coin.currency, ticker)) : undefined;

    newSettings.currency = coin.currency;
    newSettings.netType = net ? net : 'live';
    newSettings.ticker = token ? token.ticker : undefined;

    return newSettings;
  }

  render () {
    return (
      <Switch>
        <Route exact path="/:currency" component={HomeContainer}/>
        <Route exact path="/:currency/blocks" component={BlockTableContainer}/>
        <Route exact path="/:currency/block/:blockHash" component={BlockContainer}/>
        <Route exact path="/:currency/transactions" component={TxnTableContainer}/>
        <Route exact path="/:currency/transaction/:txnHash" component={TxnContainer}/>
        <Route exact path="/:currency/address/:addrHash" component={AddressContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

RoutesContainer.propTypes = {

  // Current state of settings in redux
  settings: PropTypes.shape({
    currency: PropTypes.string,
    netType: PropTypes.string,
    ticker: PropTypes.string
  }),

  // Action dispatcher to set the state of settings
  setSettings: PropTypes.func
}

const mapDisptachToProps = (dispatch) => {
  const {
    setSettings
  } = settingsActionCreators;

  return bindActionCreators({
    setSettings
  }, dispatch);
}

export default connectSettings(undefined, mapDisptachToProps)(RoutesContainer);