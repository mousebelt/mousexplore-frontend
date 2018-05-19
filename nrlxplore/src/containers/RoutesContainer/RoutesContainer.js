import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import qs from 'query-string';
// import { find } from 'lodash/find';
import { findCoinByCurrency, findTokenByTicker } from 'config';
import { connectSettings } from 'core';

import HomeContainer from 'containers/HomeContainer/HomeContainer';
import BlockListContainer from 'containers/BlockListContainer/BlockListContainer';
import BlockContainer from 'containers/BlockContainer/BlockContainer';
import TxnListContainer from 'containers/TxnListContainer/TxnListContainer';
import TxnContainer from 'containers/TxnContainer/TxnContainer';
import AddressContainer from 'containers/AddressContainer/AddressContainer';
import PageNotFound from 'components/PageNotFound/PageNotFound';


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
    const newSettings = this.getSettingsFromURL();
    const { history, setSettings } = this.props;

    if (!newSettings)
      history.replace('/404');
    else
      setSettings(newSettings);
  }

  getSettingsFromURL () {
    const { location, match, settings } = this.props;
    const newSettings = {};
    
    if (!match.params || !match.params.currency) {
      return undefined;
    }

    // Get currency
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

    const token = ticker ? (findTokenByTicker(coin.currency, ticker)).ticker : undefined;

    newSettings.currency = coin.currency;
    newSettings.netType = net ? net : 'live';
    newSettings.token = token;

    return newSettings;
  }

  render () {
    return (
      <Switch>
        <Route exact path="/:currnecy" component={HomeContainer}/>
        <Route exact path="/:currency/blocks" component={BlockListContainer}/>
        <Route exact path="/:currency/block/:blockHash" component={BlockContainer}/>
        <Route exact path="/:currency/transactions" component={TxnListContainer}/>
        <Route exact path="/:currency/transaction/:txnHash" component={TxnContainer}/>
        <Route exact path="/:currency/address/:addrHash" component={AddressContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default connectSettings()(withRouter(RoutesContainer));