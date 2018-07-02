import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { store } from 'core';
import HeaderContainer from 'containers/HeaderContainer/HeaderContainer';
import SettingsContainer from 'containers/SettingsContainer/SettingsContainer';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';
import PageNotFound from 'components/PageNotFound/PageNotFound';

import 'assets/styles/App.less';

// Basic lanuage support of English
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import enMessages from 'language/en';

addLocaleData([...en]);

const getMessages = locale => {
  switch(locale) {
    // Add more locale messages here

    default:
      return enMessages;
  }
};

const initialLanguage = 'en';

class App extends Component {
  render() {
    return (
      <IntlProvider
        key={initialLanguage}
        locale={initialLanguage}
        messages={getMessages(initialLanguage)}
      >
        <Provider store={store}>
          <Router>
            <div className="App">
              {/* <HeaderContainer /> */}
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
      </IntlProvider>
    );
  }
}

export default App;
