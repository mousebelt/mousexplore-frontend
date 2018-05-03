import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwnerContainer from './Owner/Owner';
import SettingsContainer from '../SettingsContainer/SettingsContainer';
import 'assets/styles/header.css';
import 'antd/dist/antd.css';
class HeaderContainer extends Component {
    render() {
        return (
            <div className={'header'}>
                <OwnerContainer />
                <SettingsContainer />
            </div>
        );
    }
}

export default HeaderContainer;