import React, { Component } from 'react';
import CurrencySelectionContainer from '../CurrencySelectContainer/CurrencySelectContainer';
import NetTypeToggleContainer from '../NetTypeToggleContainer/NetTypeToggleContainer';
import TokenSelectContainer from '../TokenSelectContainer/TokenSelectContainer';

class SettingsContainer extends Component {
    render() {
        return (
            <div className={'settings'}>
                <CurrencySelectionContainer />
                <NetTypeToggleContainer />
                <TokenSelectContainer />
            </div>
        );
    }
}

export default SettingsContainer;