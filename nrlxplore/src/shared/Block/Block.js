import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

import 'assets/styles/Block.css'

class Block extends Component {
  render() {
    const { block } = this.props;

    return (
      <div class='nrl-block-flexbox'>
        <div class='nrl-block-left'>
          <span class='nrl-block-id'>Block {block.id}</span>
          <span class='nrl-block-timestamp'>{block.timestamp}</span>
        </div>
        <div class='nrl-block-right'>
          <span class='nrl-block-author'>Mined by <b>{block.author}</b></span>
          <span class='nrl-block-txn-counts'>{block.txnCount} txns</span>
        </div>
      </div>
    );
  }
}

export default Block;
