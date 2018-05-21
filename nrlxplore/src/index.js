import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import 'assets/styles/index.less';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

registerServiceWorker();
