import React, { Component } from 'react';
import { Select } from 'antd';

import 'assets/styles/Dropdown.css';

const { Option } = Select;

class DropdownSelect extends Component {
  render() {
    const { className, placeholder, options, defaultValue } = this.props;

    return (
      <Select className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
      >
        {
          options.length > 0 &&
          options.map((item, index) => (
            <Option key={index} value={item.value}>{item.name}</Option>
          ))
        }
      </Select>
    );
  }
}

export default DropdownSelect;
