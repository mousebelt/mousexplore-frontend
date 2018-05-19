import React, { Component } from 'react';
import SearchbarContainer from "../SearchbarContainer/SearchbarContainer";
import CurrencyContent from "../CurrencyContent/CurrencyContent";
import BlockContainer from "../BlockListContainer/BlockContainer/BlockContainer";
import TxnContainer from "../TxnContainer/TxnContainer";

import { Row, Col } from "antd";

import "assets/styles/body.css"

class BodyContainer extends Component {
  render() {
    return (
      <div className={'body'}>
        <SearchbarContainer />
        <CurrencyContent />
        <Row gutter={24}>
          <Col span={12}><BlockContainer /></Col>
          <Col span={12}><TxnContainer /></Col>
        </Row>
      </div>
    );
  }
}

export default BodyContainer;