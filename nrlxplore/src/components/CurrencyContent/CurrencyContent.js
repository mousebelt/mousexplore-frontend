import React, { Component } from 'react';

import { Row, Col } from "antd";

class CurrencyContent extends Component {
    render() {
      return (
        <div className={'currency-content'}>
          <Row gutter='24'>
            <Col span='12'>
            </Col>
            <Col span='12'>
            </Col>
          </Row>
        </div>
      );
    }
  }
  
  export default CurrencyContent;