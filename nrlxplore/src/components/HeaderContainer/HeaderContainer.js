import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './HeaderContainer.css';

class HeaderContainer extends Component {
  render() {
    return (
      <div className='header'>
        <h2>Header title</h2>
      </div>
    );
  }
}

export default HeaderContainer;
