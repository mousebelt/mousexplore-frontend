import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import HomeContainer from 'components/HomeContainer/HomeContainer';
import BlockListContainer from 'components/BlockListContainer/BlockListContainer';
import BlockContainer from 'components/BlockContainer/BlockContainer';
import TxnListContainer from 'components/TxnListContainer/TxnListContainer';
import TxnContainer from 'components/TxnContainer/TxnContainer';
import AddressContainer from 'components/AddressContainer/AddressContainer';
import PageNotFound from 'shared/PageNotFound/PageNotFound';

class RoutesContainer extends PureComponent {
  componentWillMount() {
    console.log(this.props);
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
        <Route component={PageNotFound}/>
      </Switch>
    )
  }
}

export default withRouter(RoutesContainer);