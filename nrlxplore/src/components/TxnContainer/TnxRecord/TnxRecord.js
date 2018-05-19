import React, { Component } from 'react';

import { Card, Row, Col, Icon } from "antd";

import "assets/styles/tnx.css"

class TnxRecord extends Component {
    render() {
      return (
        <div className={'tnx-container'}>
          <Card.Grid className="tnx-record">
            <Row>
                <Col span={12} className="record-header"><Icon type="right-circle" /> BTC</Col>
                <Col span={12} className="record-time"><Icon type="clock-circle-o" />Timestamp</Col>
            </Row>
            <div>hashhashhashhashhashhash</div>
          </Card.Grid>
        </div>
      );
    }
  }
  
  export default TnxRecord;