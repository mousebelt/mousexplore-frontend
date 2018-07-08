import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';
import promiseFinally from 'promise.prototype.finally';

import 'font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.css';
import 'assets/styles/index.less';

promiseFinally.shim();

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

registerServiceWorker();
