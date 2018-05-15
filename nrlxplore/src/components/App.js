import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';
import { Layout, Menu } from "antd";

import HeaderContainer from './HeaderContainer/HeaderContainer';
import BodyContainer from "./BodyContainer/BodyContainer";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout className="layout">
            <Header>
              <HeaderContainer />
            </Header>
            <Content>
              <BodyContainer />
            </Content>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
