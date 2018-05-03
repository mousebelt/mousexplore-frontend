import React, { Component } from 'react';
import { Switch } from 'antd';

class NetTypeToggleContainer extends Component {
    render() {
        return (
            <div className={'net-type-toggle'}>
                <p>Livenet/Testnet</p>
                <Switch />
            </div>
        );
    }
}

export default NetTypeToggleContainer;