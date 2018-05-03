import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OwnerContainer extends Component {
    render() {
        return (
            <div className={'owner'}>
                <img src={require('assets/img/logo.svg')} className={'logo'}/>
                <h2>Owner Name</h2>
            </div>
        )
    }
}

export default OwnerContainer;