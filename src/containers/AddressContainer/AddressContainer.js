import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import BTCAddress from './BTCAddress';
import ETHAddress from './ETHAddress';
import LTCAddress from './LTCAddress';
import NEOAddress from './NEOAddress';
import XLMAddress from './XLMAddress';

const AddressComponentMap = {
  BTC: BTCAddress,
  ETH: ETHAddress,
  LTC: LTCAddress,
  NEO: NEOAddress,
  XLM: XLMAddress,
}

class AddressContainer extends PureComponent {
  render () {
    const { currency, match } = this.props;

    const AddressComponent = AddressComponentMap[currency] || null;

    return <AddressComponent address={match.params.addrHash}/>;
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
});

export default connectSettings(mapStateToProps, {})(AddressContainer);