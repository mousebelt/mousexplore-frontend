import React, { Component } from 'react';
import { Switch } from 'antd';

import 'assets/styles/Switch.css'

class NetTypeToggleContainer extends Component {
  render() {
    return (
      <div className={'livenet-toggle-container'}>
        <Switch checkedChildren="Livenet" unCheckedChildren="Offline" defaultChecked />
      </div>
    );
  }
}

export default NetTypeToggleContainer;
