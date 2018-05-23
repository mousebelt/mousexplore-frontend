import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'core';

import Txn from '../Txn/Txn'

class List extends PureComponent {

  render() {
    const { className, data, renderItem, icon, title, linkToAll, header, footer } = this.props;

    const defaultHeader = (
      <div className="nrl__list-header--content">
        { 
          icon && <img src={icon} className="nrl__list-header-icon"/>
        }
        {
          title && <h5 className="nrl__list-header-title">{title}</h5>
        }
      </div>
    );

    const defaultFooter = null;

    return (
      <div className={`nrl__list${className ? ' ' + className : ''}`}>
        <div className="nrl__list-header">
          {
            header ? header : defaultHeader
          }
        </div>
        <div className="nrl__list-items">
          {
            (data && data.length) ? (
              data.map((item, index) => (
                <div className="nrl__list-item" key={index}>
                  {
                    renderItem(item, index)
                  }
                </div>
              ))
            ) : "No items to show..."
          }
        </div>
        <div className="nrl__list-footer">
          {
            footer ? footer : defaultFooter
          }
        </div>
      </div>
    );
  }
}

export default List;
