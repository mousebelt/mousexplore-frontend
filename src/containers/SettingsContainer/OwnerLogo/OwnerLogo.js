import React from 'react';
import HashLink from 'components/HashLink/HashLink'

import logoImg  from'assets/img/logo.png';

const OwnerLogo = (props) => (
  <div className="logo">
    <HashLink hash="/">
      <img className="logo__img" src={logoImg} alt="App Logo"/>
    </HashLink>
  </div>
)

export default OwnerLogo;
