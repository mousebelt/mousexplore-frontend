import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logoImg from 'assets/img/logo.svg'

class OwnerContainer extends Component {
  render() {
    return (
      <div className={'owner'}>
        <img src={logoImg} className={'logo img-responsive img-fluid'} />
        <h2>Owner Name</h2>
      </div>
    )
  }
}

export default OwnerContainer;