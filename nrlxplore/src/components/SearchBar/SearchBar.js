import React, { Component } from 'react';
import { Input } from 'antd';
const Search = Input.Search;


class SearchBar extends Component {
  render() {
    return (
      <Search
        placeholder="Search by address / txn hash / block..."
        onSearch={value => console.log(value)}
        enterButton
      />
    );
  }
}

export default SearchBar;
