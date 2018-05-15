import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logoImg from 'assets/img/nitro-refined-540.png'

class OwnerContainer extends Component {
  render() {
    return (
      <div className='organization'>
        <img src={logoImg} className={'logo'} />
        <div className='org-name'>NRLXplore</div>
      </div>
    )
  }
}

export default OwnerContainer;
