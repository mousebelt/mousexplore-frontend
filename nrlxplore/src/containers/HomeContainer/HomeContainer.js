import React, { PureComponent } from 'react'; 
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connectSettings } from 'core';

import LatestBlocks from './LatestBlocks/LatestBlocks';
import LatestTransactions from './LatestTransactions/LatestTransactions';
import LatestLedgers from './LatestLedgers/LatestLedgers';

class HomeContainer extends PureComponent {

  render () {
    const { currency } = this.props;

    if (currency === 'XLM') {
      return (
        <div className="home">
          <Row gutter={24}>
            <Col span={20} push={2}>
              <LatestTransactions/>
            </Col>
            
            <Col span={20} push={2}>
              <LatestBlocks/>
            </Col>
            <Col span={20} push={2}>
              <LatestLedgers/>
            </Col>
          </Row>
        </div>
      );
    } else {
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
      );
    }
  }  
}
const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(HomeContainer);