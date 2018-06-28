import React from 'react';
import { Link } from 'react-router-dom';
import { connectSettings } from 'core';
import qs from 'query-string';

const HashLink = ({settings, type, hash, children, ...props}) => {
  const { currency, netType, ticker } = settings;

  const queryString = qs.stringify({
    net: (netType.toLowerCase() === 'test') ? netType.toLowerCase() : undefined,
    ticker: ticker ? ticker.toLowerCase() : undefined,
  });

  const toObject = {
    pathname: `/${currency.toLowerCase()}${type ? '/' + type.toLowerCase() : ''}${hash ? '/' + hash : ''}`,
    search: queryString
  };

  return (
    <Link {...props} to={toObject}>
      {children}
    </Link>
  );
}

export default connectSettings(undefined, {})(HashLink);