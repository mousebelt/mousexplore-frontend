import React from 'react';
import { Link } from 'react-router-dom';

import logoImg  from'assets/img/logo.png';

const OwnerLogo = (props) => (
  <div className="logo">
    <Link to={`/${props.currency.toLowerCase()}`}>
      <img className="logo__img" src={logoImg} alt="App Logo"/>
    </Link>
  </div>
)

export default OwnerLogo;
