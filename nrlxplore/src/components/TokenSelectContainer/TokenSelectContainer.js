import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;

class TokenSelectContainer extends Component {
  render() {
    return (
      <div className='token-select-container'>
        <Select className={'token-select'}
          placeholder={'Select Token (Optional)'}
        >
          <Option value="lucy">Ronaldo</Option>
          <Option value="messi">Messi</Option>
        </Select>
      </div>
    );
  }
}

export default TokenSelectContainer;
