import React, { Component } from 'react';

import { Card, Button, Icon } from "antd";

import TnxRecord from "./TnxRecord/TnxRecord";

class TnxContainer extends Component {
  render() {
    return (
      <div className={'tnx-container'}>
        <Card title={<div><Icon type="credit-card" /> Transactions</div>} extra={<Button size="default">View all</Button>}>
            <TnxRecord />
        </Card>
      </div>
    );
  }
}
  
export default TnxContainer;