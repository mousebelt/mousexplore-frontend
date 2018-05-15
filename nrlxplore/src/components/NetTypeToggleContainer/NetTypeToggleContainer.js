import React, { Component } from 'react';
import { Switch } from 'antd';

class NetTypeToggleContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'testnet'
    }
  }

  toggleState(checked){
    if(checked) this.setState({mode: 'livenet'})
    else this.setState({mode: 'testnet'})
  }

  render() {
    return (
      <div className={'net-type-toggle'}>
        <label>{this.state.mode}</label><Switch onChange={(checked)=>{this.toggleState(checked)}} />
      </div>
    );
  }
}

export default NetTypeToggleContainer;