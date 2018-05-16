import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';
import HeaderContainer from 'components/HeaderContainer/HeaderContainer';
import SettingsContainer from 'components/SettingsContainer/SettingsContainer';
import RoutesContainer from 'components/RoutesContainer/RoutesContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <HeaderContainer />
            <div className="content">
              <SettingsContainer />
              <RoutesContainer/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
