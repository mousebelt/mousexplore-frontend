import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
// import qs from 'query-string'
// import { coins } from 'config';

import HomeContainer from 'containers/HomeContainer/HomeContainer';
import BlockListContainer from 'containers/BlockListContainer/BlockListContainer';
import BlockContainer from 'containers/BlockContainer/BlockContainer';
import TxnListContainer from 'containers/TxnListContainer/TxnListContainer';
import TxnContainer from 'containers/TxnContainer/TxnContainer';
import AddressContainer from 'containers/AddressContainer/AddressContainer';
// import PageNotFound from 'components/PageNotFound/PageNotFound';

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
    console.log(this.props);
    
  }

  // getSettingsFromURL () {
  //   const defaultSetting = {
  //     currency: 'BTC',
  //     netType: 'live',
  //     ticker: undefined
  //   };

  //   const { location, match } = this.props;
    
  //   if (!match.params || !match.params.currency) {
  //     return undefined;
  //   }

  //   const currency = match.params.currency.toUpperCase();

  //   if (!!coins[currency]) {
  //     const coin = coins[currency];
  //     const { netType, ticker } = qs.parse(location.search);
  //     const settings = defaultSetting;
      
  //     if (ticker && coin.hasTokens && 
  //       coin.tokens.findIndex(token => (token.ticker.toUpperCase() === ticker.toUpperCase()) >= 0)



  //   } else {
  //     return undefined;
  //   }
  // }

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

export default withRouter(RoutesContainer);