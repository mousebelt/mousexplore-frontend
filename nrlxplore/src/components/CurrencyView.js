import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

import HeaderContainer from './HeaderContainer/HeaderContainer';
import SettingsContainer from './SettingsContainer/SettingsContainer';
import BlockListContainer from './BlockListContainer/BlockListContainer';
import TxnContainer from './TxnContainer/TxnContainer';

import 'assets/styles/CurrencyView.css'
import 'assets/styles/List.css'

class CurrencyView extends Component {
  render() {
    return (
        <div className="currency-view">
          <SettingsContainer />
          <BlockListContainer />
          <TxnContainer />
        </div>
    );
  }
}

export default CurrencyView;
