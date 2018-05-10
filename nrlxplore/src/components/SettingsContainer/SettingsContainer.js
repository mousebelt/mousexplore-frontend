import React, { Component } from 'react';
import CurrencySelectionContainer from '../CurrencySelectContainer/CurrencySelectContainer';
import NetTypeToggleContainer from '../NetTypeToggleContainer/NetTypeToggleContainer';
import TokenSelectContainer from '../TokenSelectContainer/TokenSelectContainer';
import SearchBar from '../../shared/SearchBar/SearchBar';

import 'assets/styles/SettingsContainer.css';


class SettingsContainer extends Component {
  render() {
    return (
      <div className={'settings'}>
        <div className='filter-container'>
          <CurrencySelectionContainer />
          <NetTypeToggleContainer />
          <TokenSelectContainer />
        </div>
        <div className='search-container'>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default SettingsContainer;
