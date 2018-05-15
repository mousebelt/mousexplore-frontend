import React, { Component } from 'react';
import { Input } from "antd";

import "assets/styles/searchbar.css";

const Search = Input.Search

class SearchbarContainer extends Component {
  render() {
    return (
      <div className={'searchbar'}>
        <Search enterButton="Search" size="large" />
      </div>
    );
  }
}

export default SearchbarContainer;