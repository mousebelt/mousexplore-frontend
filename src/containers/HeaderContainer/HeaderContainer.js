import React, { Component } from 'react';
import OwnerLogo from './OwnerLogo/OwnerLogo';

class HeaderContainer extends Component {
  render() {
    return (
      <div className="header">
        <OwnerLogo/>
      </div>
    );
  }
}

export default HeaderContainer;
