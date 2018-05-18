import React, { PureComponent } from 'react';
import Toggle from 'components/Toggle/Toggle';

class NetTypeToggle extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: true
    };
  }

  render() {
    const { isChecked } = this.state;

    return (
      <div className="settings__filter-nettype">
        <span className="net-name">{isChecked ? 'Livenet' : 'Testnet'}</span>
        <Toggle
          {...this.props}
          checked={isChecked}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleChange = (checked) => {
    this.setState({
      isChecked: checked
    });
  }
}

export default NetTypeToggle;
