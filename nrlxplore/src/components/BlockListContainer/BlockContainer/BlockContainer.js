import React, { Component } from 'react';

import { Card, Button, Icon } from "antd";

import BlockRecord from "./BlockRecord/BlockRecord";


class BlockContainer extends Component {
  render() {
    return (
      <div className={'block-container'}>
        <Card title={<div><Icon type="inbox" /> Blocks</div>} extra={<Button size="default">View all</Button>}>
          <BlockRecord />
        </Card>
      </div>
    );
  }
}
  
export default BlockContainer;