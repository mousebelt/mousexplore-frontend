import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import LatestBlocks from './LatestBlocks/LatestBlocks';
import LatestTransactions from './LatestTransactions/LatestTransactions';
import LatestLedgers from './LatestLedgers/LatestLedgers';

class HeaderContainer extends PureComponent {

  render () {
    return (
      <div className="home">
        <Row gutter={24}>
          <Col span={24}>
            <LatestTransactions/>
          </Col>
          
          <Col span={12}>
            <LatestBlocks/>
          </Col>
          <Col span={12}>
            <LatestLedgers/>
          </Col>
        </Row>
      </div>
    )
  }  
}

export default withRouter(HeaderContainer);