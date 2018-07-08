import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findCoinByCurrency } from 'config';

import Toggle from 'components/Toggle/Toggle';

class NetTypeToggle extends PureComponent {
  handleChange = (isLiveNet) => {
    const { setNetType } = this.props;

    setNetType(isLiveNet ? 'live' : 'test');
  }

  render() {
    const { netType, currency } = this.props;
    const isLiveNet = (netType === 'live');
    const coin = findCoinByCurrency(currency);
    const isDisabled = (!coin.api.live || !coin.api.test)

    return (
      <div className="settings__filter-nettype">
        {
          // <span className="net-name">{isLiveNet ? 'Livenet' : 'Testnet'}</span>
        }
        <Toggle
          checked={isLiveNet}
          onChange={this.handleChange}
          checkedChildren="Livenet"
          unCheckedChildren="Offline"
          disabled={isDisabled}
        />
      </div>
    );
  }
}

NetTypeToggle.propTypes = {
  currency: PropTypes.string,
  netType: PropTypes.string,
  setNetType: PropTypes.func
}

export default NetTypeToggle;
