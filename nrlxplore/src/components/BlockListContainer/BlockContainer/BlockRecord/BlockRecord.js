import React, { Component } from 'react';

import { Card, Row, Col, Icon } from "antd";

import "assets/styles/block.css"

class BlockRecord extends Component {
    render() {
      return (
        <div className={'block-container'}>
          <Card.Grid className="block-record">
            <Row>
                <Col span={12} className="record-header"><Icon type="inbox" /> BTC</Col>
                <Col span={12} className="record-time"><Icon type="clock-circle-o" />Timestamp</Col>
            </Row>
            <div>hashhashhashhashhashhash</div>
          </Card.Grid>
        </div>
      );
    }
  }
  
  export default BlockRecord;