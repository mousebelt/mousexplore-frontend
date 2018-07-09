import React from 'react';
import { Link } from 'react-router-dom';
import { connectSettings } from 'core';
import qs from 'qs';

const HashLink = ({settings, type, hash, children, ...props}) => {
  const { currency, netType, ticker } = settings;

  const queryString = qs.stringify({
    net: (netType.toLowerCase() === 'test') ? netType.toLowerCase() : undefined,
    ticker: ticker ? ticker.toLowerCase() : undefined,
  });

  hash = (hash === '/') ? null : hash;

  const toObject = {
    pathname: `/${currency.toLowerCase()}${type ? '/' + type.toLowerCase() : ''}${hash ? '/' + hash : ''}`,
    search: queryString
  };

  if (hash === 'n/a') {
    return (
      <span {...props}>
        {children}
      </span>
    )
  }

  return (
    <Link {...props} to={toObject}>
      {children}
    </Link>
  );
}

export default connectSettings(undefined, {})(HashLink);