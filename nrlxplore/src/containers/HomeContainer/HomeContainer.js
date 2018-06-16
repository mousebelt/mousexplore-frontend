import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connectSettings } from 'core';

import LatestBlocks from './LatestBlocks/LatestBlocks';
import LatestTransactions from './LatestTransactions/LatestTransactions';
import LatestLedgers from './LatestLedgers/LatestLedgers';
import LatestOperations from './LatestOperations/LatestOperations'

class HomeContainer extends PureComponent {

  render () {
    const { currency } = this.props;

    if (currency === 'XLM') {
      return (
        <div className="home">
          <div className="flex-layout">
            <LatestOperations/>
          </div>
          <div className="flex-layout">
            <LatestLedgers/>
            <LatestTransactions/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="home">
          <div className="flex-layout">
            <LatestBlocks/>
            <LatestTransactions/>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(HomeContainer);
