import React, { Component } from 'react';
import SearchbarContainer from "../SearchbarContainer/SearchbarContainer";
import CurrencyContent from "../CurrencyContent/CurrencyContent";

import "assets/styles/body.css"

class BodyContainer extends Component {
  render() {
    return (
      <div className={'body'}>
        <SearchbarContainer />
        <CurrencyContent />
      </div>
    );
  }
}

export default BodyContainer;