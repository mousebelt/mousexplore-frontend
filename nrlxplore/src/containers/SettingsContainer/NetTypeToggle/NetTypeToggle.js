import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Toggle from 'components/Toggle/Toggle';

class NetTypeToggle extends PureComponent {
  handleChange = (isLiveNet) => {
    const { setNetType } = this.props;

    setNetType(isLiveNet ? 'live' : 'test');
  }

  render() {
    const { netType } = this.props;
    const isLiveNet = (netType === 'live');

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
        />
      </div>
    );
  }
}

NetTypeToggle.propTypes = {
  netType: PropTypes.string,
  setNetType: PropTypes.func
}

export default NetTypeToggle;
