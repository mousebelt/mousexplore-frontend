import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;

class CurrencySelectContainer extends Component {
    render() {
        return (
            <div>
                <Select className={'currency-select'}
                    placeholder={'Select Currency'}
                >
                    <Option value="bitcoin">Bitcoin</Option>
                    <Option value="ethereum">Ethereum</Option>
                </Select>
            </div>
        );
    }
}

export default CurrencySelectContainer;