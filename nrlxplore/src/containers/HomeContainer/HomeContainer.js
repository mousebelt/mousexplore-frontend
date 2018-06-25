import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import LatestBlocks from './LatestBlocks';
import LatestTransactions from './LatestTransactions';
import LatestLedgers from './LatestLedgers';
import LatestOperations from './LatestOperations'

class HomeContainer extends PureComponent {

  render () {
    const { currency } = this.props;

    if (currency === 'XLM') {
      return (
        <div className="home">
          <div className="flex-layout">
            <LatestLedgers/>
            <LatestTransactions/>
          </div>
          <div className="flex-layout">
            <LatestOperations/>
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
