import React, { PureComponent } from 'react';
import { Input } from 'antd';
const Search = Input.Search;


class SearchBar extends PureComponent {
  render() {
    const { className, size, enterButton, ...props } = this.props;
    return (
      <Search
        {...props}
        className={`nrl__searchbar${className ? ' ' + className : ''}`}
        enterButton={ enterButton ? enterButton : "SEARCH"}
        size={ size ? size : 'large'}
      />
    );
  }
}

export default SearchBar;
