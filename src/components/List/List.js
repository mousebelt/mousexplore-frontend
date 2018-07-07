import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'components/Spinner/Spinner';

class List extends PureComponent {
  _renderHeader = () => {
    const { icon, title, linkToAll, header } = this.props;

    const defaultHeader = (
      <div className="nrl__list-header--content">
        {
          title && (
            <h5 className="nrl__list-header--title">
              { 
                icon && (
                  <span className="nrl__list-header--icon">
                    {icon} 
                  </span>
                )
              }
              {title}
            </h5>
          )
        }
        {
          linkToAll && (
            <Link className="nrl__list-header--link" to={linkToAll}>View All</Link>
          )
        }
      </div>
    );

    return (
      <div className="nrl__list-header">
        {
          header ? header : defaultHeader
        }
      </div>
    );
  }

  _renderFooter = () => {
    const { footer } = this.props;

    const defaultFooter = null;

    return (
      <div className="nrl__list-footer">
        {
          footer ? footer : defaultFooter
        }
      </div>
    );
  }

  _renderContent = () => {
    const { data, renderItem, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className="nrl__list-items">
          <Spinner/>
        </div>
      );
    } else {
      return (
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
      );
    }
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`nrl__list${className ? ' ' + className : ''}`}>
        { this._renderHeader() }
        { this._renderContent() }
        { this._renderFooter() }
      </div>
    );
  }
}

export default List;
