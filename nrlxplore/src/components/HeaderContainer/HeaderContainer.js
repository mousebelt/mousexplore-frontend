import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwnerContainer from 'components/HeaderContainer/Owner/Owner';
import SettingsContainer from 'components/SettingsContainer/SettingsContainer';

import 'assets/styles/header.css';

class HeaderContainer extends Component {
  render() {
    return (
      <div className={'header'}>
        <OwnerContainer />
        <SettingsContainer />
      </div>
    );
  }
}

export default HeaderContainer;