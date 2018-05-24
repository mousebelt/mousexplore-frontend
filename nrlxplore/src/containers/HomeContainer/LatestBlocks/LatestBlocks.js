import React, { PureComponent } from 'react';
import List from 'components/List/List';

const mockBlocks = [
  {
    height: 1297315,
    hash: "0000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
  {
    height: 1297315,
    hash: "0000000000000171dd048645bbeee7e123093e5f4e68d38ed17fc24d34fa7142",
    timestamp: 'n/a'
  },
]

class LatestBlocks extends PureComponent {
  _renderBlock = (block) => (
    <div className="block">
      <i className="fa fa-cube icon"/>
      <div className="height">
        {block.height}
      </div>
      <div className="hash">{block.hash}</div>
      <span className="time">
        <i className="fa fa-clock-o"/> {block.timestamp}
      </span>
    </div>
  )

  render() {
    return (
      <List
        className="latest-blocks"
        icon={<i className="fa fa-cubes"/>}
        title="Blocks"
        linkToAll="#"
        data={mockBlocks}
        renderItem={this._renderBlock}
      />
    );
  }
}

export default LatestBlocks;