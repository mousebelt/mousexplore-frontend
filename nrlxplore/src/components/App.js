import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';
import HeaderContainer from './HeaderContainer/HeaderContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <HeaderContainer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
