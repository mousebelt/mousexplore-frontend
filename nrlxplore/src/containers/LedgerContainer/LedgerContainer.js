import React, { PureComponent } from 'react';
import Ledger from 'components/Ledger/Ledger';
import NotFound from 'components/NotFound/NotFound';
import { connectSettings, formatLedgerData } from 'core';

class LedgerContainer extends PureComponent {
  state = {
    ledger: undefined
  };

  componentDidMount() {
    const { apiObject, currency, match } = this.props;

    const { ledgerHash } = match.params;

    if (ledgerHash) {
      this.getLedger(apiObject, currency, ledgerHash);    
    }
  }

  componentWillReceiveProps (newProps) {
    const { apiObject, currency, match } = newProps;

    const { ledgerHash } = match.params;

    if (ledgerHash) {
      this.getLedger(apiObject, currency, ledgerHash);    
    }
  }

  getLedger(apiObject, currency, ledgerHash) {
    this.setState({
      ledger: undefined
    });

    apiObject.get(`/ledger/${ledgerHash}`)
      .then(res => {
        if (res.data.status !== 200) {
          return;
        }
        let ledger = res.data.data;

        ledger = formatLedgerData(ledger, currency);

        this.setState({ ledger: ledger });
      })
  }
  
  render () {
    const { currency } = this.props;
    const { ledger } = this.state;
    
    return (
      <div className="ledger-container">
        {
          ledger ? (
            <Ledger
              currency={currency}
              ledger={ledger}
            />
          ) : (
            <NotFound/>
          )
        }
        
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => ({
  currency: settings.currency,
  apiObject: settings.apiObject
});

export default connectSettings(mapStateToProps, {})(LedgerContainer);