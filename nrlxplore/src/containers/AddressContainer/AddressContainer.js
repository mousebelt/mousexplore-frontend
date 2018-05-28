import React, { PureComponent } from 'react';
import { connectSettings } from 'core';

import Address from 'components/Address/Address';

const mockAddress = {
  address: "0xaa7a7c2decb180f68f11e975e6d92b5dc06083a6",
  balance: 3.5,
  txnHistory: [
    {   
      block: "2165403",
      timestamp: 1472533979,
      hash: "0x21febe7aa17c03545548d3616eba55ce5c645c7a601a71464cc16526ae4e890a",
      from: "0xaa7a7c2decb180f68f11e975e6d92b5dc06083a6",
      to: "0xaa7a7c2decb180f68f11e975e6d92b5dc06083a6",
      value: "0.007792298571672 Ether",
      fee: "0.000084"
    },
    {   
      block: "2165403",
      timestamp: 1472533979,
      hash: "0x98db583e5ff636b78",
      from: "0xaa7a7c2decb180f68f11e975e6d92d06083a6",
      to: "0xaa7a7c2decb180f68f11e975e6d92b5dc06083a6",
      value: "0.007792298571672 Ether",
      fee: "0.000084"
    },
    {   
      block: "2165403",
      timestamp: 1472533979,
      hash: "0x98db583e5ff636b78",
      from: "0xaa7a7c2decb180f68f11e975e6d92d06083a6",
      to: "0xaa7a7c2decb180f68f11e975e6d92b5dc06083a6",
      value: "0.007792298571672 Ether",
      fee: "0.000084"
    },
    {   
      block: "2165403",
      timestamp: 1472533979,
      hash: "0x98db583e5ff636b78",
      from: "0xaa7a7c2decb180f68f11e975e6d92b5dc06083a6",
      to: "0xaa7a7c2decb180f68f11e975e6d92e06083a6",
      value: "0.007792298571672 Ether",
      fee: "0.000084"
    },
  ]
}

class AddressContainer extends PureComponent {
  constructor(props) {
    super(props);

    const { currency, match } = this.props;

    this.state = {
      // currency: currency,
      // address: match.params.addrHash,
      // balance: 0,
      // txnHistory: [],      

      ...mockAddress
    };

    console.log(this.props);
  }

  componentDidMount() {
    // get information from nodes
  }

  _renderTXNHistory = (txn, index) => {
    return (
      <div key={index}/>
    );
  };

  render () {
    const { currency } = this.props;
    const { address, balance, txnHistory } = this.state;
    return (
      <Address
        currency={currency}
        address={address}
        balance={balance}
        txnHistory={txnHistory}
        // renderTXNHistory={this._renderTXNHistory}
      />
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency
});


export default connectSettings(mapStateToProps, {})(AddressContainer);