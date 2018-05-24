import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import LatestBlocks from './LatestBlocks/LatestBlocks';
import LatestTransactions from './LatestTransactions/LatestTransactions';

class HeaderContainer extends PureComponent {

  render () {
    return (
      <div className="home">
        <Row gutter={24}>
          <Col span={12}>
            <LatestBlocks/>
          </Col>
          <Col span={12}>
            <LatestTransactions/>
          </Col>
        </Row>
      </div>
    )
  }  
}

export default withRouter(HeaderContainer);