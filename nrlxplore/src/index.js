import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

registerServiceWorker();
