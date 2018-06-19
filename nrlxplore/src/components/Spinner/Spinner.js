import React from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" spin />;

const Spinner = () => (
  <div className="nrl__spinner">
    <Spin indicator={antIcon} />
  </div>
);

export default Spinner;