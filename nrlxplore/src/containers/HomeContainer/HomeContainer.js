import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { List } from 'components/List/List';

import LatestBlocks from './LatestBlocks/LatestBlocks';

class HeaderContainer extends PureComponent {

  render () {
    return (
      <div className="home">
        <Row gutter={24}>
          <Col span={12}>
            <LatestBlocks/>
          </Col>
          <Col span={12}>
            <LatestBlocks/>
          </Col>
        </Row>
      </div>
    )
  }  
}

export default withRouter(HeaderContainer);