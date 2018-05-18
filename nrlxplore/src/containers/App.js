import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { store } from 'core';
import HeaderContainer from 'containers/HeaderContainer/HeaderContainer';
import SettingsContainer from 'containers/SettingsContainer/SettingsContainer';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';
import PageNotFound from 'components/PageNotFound/PageNotFound';

import 'assets/styles/App.less';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <HeaderContainer />
            <div className="content">
              <SettingsContainer />
              <Switch>
                <Redirect exact from="/" to="/btc"/>
                <Route exact path="/404" component={PageNotFound}/>
                <Route path="/:currency" component={RoutesContainer}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
