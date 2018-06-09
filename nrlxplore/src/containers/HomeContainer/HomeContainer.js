import React, { PureComponent } from 'react';
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
          <LatestLedgers/>
          <LatestTransactions/>
        </div>
      );
    } else {
      return (
        <div className="home">
          <LatestBlocks/>
          <LatestTransactions/>
        </div>
      );
    }
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});

export default connectSettings(mapStateToProps, {})(HomeContainer);
