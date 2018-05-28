import React, { Component } from 'react';

// import BlockList from 'components/List/BlockList';

const mockBlocks = [
  {
    id: '317fb03f13',
    author: '323392aba4d7df996790b4dcbf7062d0',
    txnCount: 234,
    timestamp: 'n/a'
  },
  {
    id: '7204ee1316',
    author: 'e910d8bb2a7e41c7d56d4019b97094b6',
    txnCount: 114,
    timestamp: 'n/a'
  },
  {
    id: '76dd5ebfb0',
    author: 'f6a197fdfaed5bc4735b59e74dbeedf8',
    txnCount: 9,
    timestamp: 'n/a'
  },
  {
    id: '009e3f8a0c',
    author: '817a1b17cfbde176e6fde31b24a4abef',
    txnCount: 109,
    timestamp: 'n/a'
  }
]

class BlockTableContainer extends Component {
  render() {
    return (
      <div className="block-list-container">
        <div className='block-list-header'>Blocks</div>
        {/* <BlockList list={mockBlocks} /> */}
      </div>
    );
  }
}

export default BlockTableContainer;
