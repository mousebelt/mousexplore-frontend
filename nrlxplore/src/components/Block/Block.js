import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

class Block extends Component {
  render() {
    const { block } = this.props;

    return (
      <div className='nrl-block-flexbox'>
        <div className='nrl-block-left'>
          <span className='nrl-block-id'>Block {block.id}</span>
          <span className='nrl-block-timestamp'>{block.timestamp}</span>
        </div>
        <div className='nrl-block-right'>
          <span className='nrl-block-author'>Mined by <b>{block.author}</b></span>
          <span className='nrl-block-txn-counts'>{block.txnCount} txns</span>
        </div>
      </div>
    );
  }
}

export default Block;
