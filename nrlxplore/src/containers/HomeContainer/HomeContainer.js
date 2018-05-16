import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class HeaderContainer extends PureComponent {
  render () {
    return (
      <div className="home">
        Home Container
      </div>
    )
  }
}

export default withRouter(HeaderContainer);