import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

import Block from '../Block/Block'

class BlockList extends Component {
  render() {
    const { list, currency } = this.props;

    return (
      <div className="list">
        {
          (list && (list.length > 0)) &&
            list.map((item, index) => (
              <Block
                key={index}
                block={item}
                currency={currency}
              />
            ))
        }
      </div>
    );
  }
}

export default BlockList;
