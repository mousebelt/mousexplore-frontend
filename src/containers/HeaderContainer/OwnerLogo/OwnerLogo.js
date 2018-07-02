import React from 'react';
import HashLink from 'components/HashLink/HashLink'

import logoImg  from'assets/img/logo.png';

const OwnerLogo = () => (
  <div className="logo">
    <HashLink>
      <img className="logo__img" src={logoImg} alt="App Logo"/>
    </HashLink>
  </div>
)

export default OwnerLogo;
