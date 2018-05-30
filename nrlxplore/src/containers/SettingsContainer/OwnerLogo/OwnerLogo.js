import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import logoImg  from'assets/img/logo.png';

const OwnerLogo = () => (
  <div className="logo">
    <Link to="/">
      <img className="logo__img" src={logoImg} alt="App Logo"/>
    </Link>
  </div>
)

export default withRouter(OwnerLogo);
